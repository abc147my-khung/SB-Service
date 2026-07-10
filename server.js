const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { promisify } = require("util");

const scrypt = promisify(crypto.scrypt);
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const STORE_FILE = path.join(DATA_DIR, "store.json");
const INITIAL_CREDENTIALS_FILE = path.join(DATA_DIR, "initial-admin.txt");
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

const sessions = new Map();
const loginAttempts = new Map();
const inquiryAttempts = new Map();

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".eot": "application/vnd.ms-fontobject"
};

let store;
let saveQueue = Promise.resolve();

function cleanText(value, max = 300) {
  return String(value ?? "").trim().replace(/[<>]/g, "").slice(0, max);
}

function normalizePhone(value) {
  return String(value ?? "").replace(/[^0-9+]/g, "").slice(0, 20);
}

function publicSettings() {
  const { businessName, phone, lineUrl, announcement } = store.settings;
  return { businessName, phone, lineUrl, announcement };
}

async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = await scrypt(password, salt, 64);
  return `${salt}:${derived.toString("hex")}`;
}

async function verifyPassword(password, storedHash) {
  const [salt, keyHex] = String(storedHash).split(":");
  if (!salt || !keyHex) return false;
  const derived = await scrypt(password, salt, 64);
  const expected = Buffer.from(keyHex, "hex");
  return expected.length === derived.length && crypto.timingSafeEqual(expected, derived);
}

async function initializeStore() {
  await fs.promises.mkdir(DATA_DIR, { recursive: true });

  try {
    store = JSON.parse(await fs.promises.readFile(STORE_FILE, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;

    const initialPassword = process.env.ADMIN_PASSWORD || "Admin@1234";
    store = {
      version: 1,
      admin: {
        username: process.env.ADMIN_USER || "admin",
        passwordHash: await hashPassword(initialPassword),
        mustChangePassword: true
      },
      settings: {
        businessName: "S&B Electronic Service",
        phone: "0849125571",
        lineUrl: "https://line.me/R/ti/p/%40ioa4439m",
        announcement: ""
      },
      products: [
        { id: crypto.randomUUID(), name: "เครื่องซักผ้าหยอดเหรียญ", category: "เครื่องซักผ้า", page: "product_1.html", status: "active", createdAt: new Date().toISOString() },
        { id: crypto.randomUUID(), name: "ตู้น้ำดื่มหยอดเหรียญ", category: "ตู้น้ำดื่ม", page: "product_2.html", status: "active", createdAt: new Date().toISOString() },
        { id: crypto.randomUUID(), name: "ธุรกิจร้านสะดวกซัก", category: "ร้านสะดวกซัก", page: "product_3.html", status: "active", createdAt: new Date().toISOString() },
        { id: crypto.randomUUID(), name: "ตู้น้ำมันหยอดเหรียญ", category: "ตู้น้ำมัน", page: "product_4.html", status: "active", createdAt: new Date().toISOString() },
        { id: crypto.randomUUID(), name: "ตู้ล้างรถหยอดเหรียญ", category: "ตู้ล้างรถ", page: "product_5.html", status: "active", createdAt: new Date().toISOString() }
      ],
      inquiries: []
    };

    await saveStore();
    const credentialText = [
      "ข้อมูลเข้าสู่ระบบหลังบ้านครั้งแรก",
      "URL: http://0.0.0.1:" + PORT + "/admin",
      "Username: " + store.admin.username,
      "Password: " + initialPassword,
      "",
      "ระบบจะให้เปลี่ยนรหัสผ่านหลังเข้าสู่ระบบ กรุณาลบไฟล์นี้เมื่อเปลี่ยนแล้ว"
    ].join("\r\n");
    await fs.promises.writeFile(INITIAL_CREDENTIALS_FILE, credentialText, { encoding: "utf8", mode: 0o600 });
    console.log("\n=== S&B ADMIN FIRST LOGIN ===");
    console.log("Username:", store.admin.username);
    console.log("Password:", initialPassword);
    console.log("Credentials:", INITIAL_CREDENTIALS_FILE);
    console.log("=============================\n");
  }

  store.settings ||= {};
  store.products ||= [];
  store.inquiries ||= [];
}

function saveStore() {
  saveQueue = saveQueue.then(async () => {
    const tempFile = STORE_FILE + ".tmp";
    await fs.promises.writeFile(tempFile, JSON.stringify(store, null, 2), "utf8");
    await fs.promises.rename(tempFile, STORE_FILE);
  });
  return saveQueue;
}

function sendJson(res, status, payload, headers = {}) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...headers
  });
  res.end(JSON.stringify(payload));
}

function sendError(res, status, message) {
  sendJson(res, status, { ok: false, message });
}

function readBody(req, limit = 100_000) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", chunk => {
      size += chunk.length;
      if (size > limit) {
        reject(Object.assign(new Error("ข้อมูลมีขนาดใหญ่เกินไป"), { status: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(Object.assign(new Error("รูปแบบข้อมูลไม่ถูกต้อง"), { status: 400 }));
      }
    });
    req.on("error", reject);
  });
}

function getIp(req) {
  return req.socket.remoteAddress || "unknown";
}

function checkRateLimit(bucket, key, max, windowMs) {
  const now = Date.now();
  const current = bucket.get(key);
  if (!current || now - current.startedAt > windowMs) {
    bucket.set(key, { startedAt: now, count: 1 });
    return true;
  }
  current.count += 1;
  return current.count <= max;
}

function parseCookies(req) {
  const cookies = {};
  for (const part of String(req.headers.cookie || "").split(";")) {
    const index = part.indexOf("=");
    if (index > -1) cookies[part.slice(0, index).trim()] = decodeURIComponent(part.slice(index + 1));
  }
  return cookies;
}

function getSession(req) {
  const token = parseCookies(req).sb_admin;
  if (!token) return null;
  const session = sessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    if (token) sessions.delete(token);
    return null;
  }
  session.expiresAt = Date.now() + SESSION_TTL_MS;
  return { token, ...session };
}

function requireAdmin(req, res, mutation = false) {
  const session = getSession(req);
  if (!session) {
    sendError(res, 401, "กรุณาเข้าสู่ระบบ");
    return null;
  }
  if (mutation && req.headers["x-admin-request"] !== "1") {
    sendError(res, 403, "คำขอไม่ผ่านการตรวจสอบความปลอดภัย");
    return null;
  }
  return session;
}

function makeSession() {
  const token = crypto.randomBytes(32).toString("base64url");
  sessions.set(token, { expiresAt: Date.now() + SESSION_TTL_MS });
  return token;
}

function clearExpired() {
  const now = Date.now();
  for (const [token, session] of sessions) if (session.expiresAt < now) sessions.delete(token);
  for (const bucket of [loginAttempts, inquiryAttempts]) {
    for (const [key, value] of bucket) if (now - value.startedAt > 60 * 60 * 1000) bucket.delete(key);
  }
}
setInterval(clearExpired, 10 * 60 * 1000).unref();

async function handleApi(req, res, url) {
  const pathname = url.pathname;

  if (req.method === "GET" && pathname === "/api/public/settings") {
    return sendJson(res, 200, { ok: true, settings: publicSettings() });
  }

  if (req.method === "GET" && pathname === "/api/public/products") {
    const products = store.products.filter(item => item.status === "active").map(({ id, name, category, page, status }) => ({ id, name, category, page, status }));
    return sendJson(res, 200, { ok: true, products });
  }

  if (req.method === "POST" && pathname === "/api/inquiries") {
    const ip = getIp(req);
    if (!checkRateLimit(inquiryAttempts, ip, 8, 60 * 60 * 1000)) {
      return sendError(res, 429, "ส่งข้อมูลบ่อยเกินไป กรุณารอสักครู่");
    }

    const body = await readBody(req);
    if (body.website) return sendJson(res, 201, { ok: true });
    const name = cleanText(body.name, 100);
    const phone = normalizePhone(body.phone);
    const province = cleanText(body.province, 100);
    const product = cleanText(body.product, 150);
    const message = cleanText(body.message, 1000);
    if (name.length < 2) return sendError(res, 400, "กรุณากรอกชื่อ");
    if (phone.replace(/\D/g, "").length < 9) return sendError(res, 400, "กรุณากรอกเบอร์โทรให้ถูกต้อง");

    const inquiry = {
      id: crypto.randomUUID(),
      name,
      phone,
      province,
      product,
      message,
      status: "new",
      createdAt: new Date().toISOString()
    };
    store.inquiries.unshift(inquiry);
    await saveStore();
    return sendJson(res, 201, { ok: true, message: "ส่งข้อมูลเรียบร้อย เจ้าหน้าที่จะติดต่อกลับโดยเร็ว" });
  }

  if (req.method === "POST" && pathname === "/api/admin/login") {
    const ip = getIp(req);
    if (!checkRateLimit(loginAttempts, ip, 8, 15 * 60 * 1000)) {
      return sendError(res, 429, "ลองเข้าสู่ระบบหลายครั้งเกินไป กรุณารอ 15 นาที");
    }
    const body = await readBody(req);
    const usernameOk = cleanText(body.username, 80) === store.admin.username;
    const passwordOk = usernameOk && await verifyPassword(String(body.password || ""), store.admin.passwordHash);
    if (!passwordOk) return sendError(res, 401, "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");

    loginAttempts.delete(ip);
    const token = makeSession();
    return sendJson(res, 200, {
      ok: true,
      user: { username: store.admin.username, mustChangePassword: Boolean(store.admin.mustChangePassword) }
    }, {
      "Set-Cookie": `sb_admin=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${SESSION_TTL_MS / 1000}`
    });
  }

  if (req.method === "POST" && pathname === "/api/admin/logout") {
    const session = getSession(req);
    if (session) sessions.delete(session.token);
    return sendJson(res, 200, { ok: true }, {
      "Set-Cookie": "sb_admin=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0"
    });
  }

  if (req.method === "GET" && pathname === "/api/admin/me") {
    const session = requireAdmin(req, res);
    if (!session) return;
    return sendJson(res, 200, {
      ok: true,
      user: { username: store.admin.username, mustChangePassword: Boolean(store.admin.mustChangePassword) }
    });
  }

  if (req.method === "GET" && pathname === "/api/admin/dashboard") {
    if (!requireAdmin(req, res)) return;
    const byStatus = store.inquiries.reduce((result, item) => {
      result[item.status] = (result[item.status] || 0) + 1;
      return result;
    }, {});
    return sendJson(res, 200, {
      ok: true,
      stats: {
        inquiries: store.inquiries.length,
        newInquiries: byStatus.new || 0,
        activeProducts: store.products.filter(item => item.status === "active").length,
        totalProducts: store.products.length
      },
      recent: store.inquiries.slice(0, 5)
    });
  }

  if (req.method === "GET" && pathname === "/api/admin/inquiries") {
    if (!requireAdmin(req, res)) return;
    const status = cleanText(url.searchParams.get("status"), 20);
    const search = cleanText(url.searchParams.get("q"), 100).toLowerCase();
    let inquiries = [...store.inquiries];
    if (status && status !== "all") inquiries = inquiries.filter(item => item.status === status);
    if (search) inquiries = inquiries.filter(item => [item.name, item.phone, item.province, item.product].join(" ").toLowerCase().includes(search));
    return sendJson(res, 200, { ok: true, inquiries });
  }

  let match = pathname.match(/^\/api\/admin\/inquiries\/([a-f0-9-]+)$/i);
  if (match && req.method === "PATCH") {
    if (!requireAdmin(req, res, true)) return;
    const inquiry = store.inquiries.find(item => item.id === match[1]);
    if (!inquiry) return sendError(res, 404, "ไม่พบรายการลูกค้า");
    const body = await readBody(req);
    if (!["new", "contacted", "closed"].includes(body.status)) return sendError(res, 400, "สถานะไม่ถูกต้อง");
    inquiry.status = body.status;
    inquiry.updatedAt = new Date().toISOString();
    await saveStore();
    return sendJson(res, 200, { ok: true, inquiry });
  }

  if (match && req.method === "DELETE") {
    if (!requireAdmin(req, res, true)) return;
    const index = store.inquiries.findIndex(item => item.id === match[1]);
    if (index === -1) return sendError(res, 404, "ไม่พบรายการลูกค้า");
    store.inquiries.splice(index, 1);
    await saveStore();
    return sendJson(res, 200, { ok: true });
  }

  if (req.method === "GET" && pathname === "/api/admin/products") {
    if (!requireAdmin(req, res)) return;
    return sendJson(res, 200, { ok: true, products: store.products });
  }

  if (req.method === "POST" && pathname === "/api/admin/products") {
    if (!requireAdmin(req, res, true)) return;
    const body = await readBody(req);
    const name = cleanText(body.name, 150);
    if (!name) return sendError(res, 400, "กรุณากรอกชื่อสินค้า");
    const product = {
      id: crypto.randomUUID(),
      name,
      category: cleanText(body.category, 100),
      page: cleanText(body.page, 200),
      status: body.status === "inactive" ? "inactive" : "active",
      createdAt: new Date().toISOString()
    };
    store.products.unshift(product);
    await saveStore();
    return sendJson(res, 201, { ok: true, product });
  }

  match = pathname.match(/^\/api\/admin\/products\/([a-f0-9-]+)$/i);
  if (match && req.method === "PUT") {
    if (!requireAdmin(req, res, true)) return;
    const product = store.products.find(item => item.id === match[1]);
    if (!product) return sendError(res, 404, "ไม่พบสินค้า");
    const body = await readBody(req);
    const name = cleanText(body.name, 150);
    if (!name) return sendError(res, 400, "กรุณากรอกชื่อสินค้า");
    Object.assign(product, {
      name,
      category: cleanText(body.category, 100),
      page: cleanText(body.page, 200),
      status: body.status === "inactive" ? "inactive" : "active",
      updatedAt: new Date().toISOString()
    });
    await saveStore();
    return sendJson(res, 200, { ok: true, product });
  }

  if (match && req.method === "DELETE") {
    if (!requireAdmin(req, res, true)) return;
    const index = store.products.findIndex(item => item.id === match[1]);
    if (index === -1) return sendError(res, 404, "ไม่พบสินค้า");
    store.products.splice(index, 1);
    await saveStore();
    return sendJson(res, 200, { ok: true });
  }

  if (req.method === "GET" && pathname === "/api/admin/settings") {
    if (!requireAdmin(req, res)) return;
    return sendJson(res, 200, { ok: true, settings: store.settings });
  }

  if (req.method === "PUT" && pathname === "/api/admin/settings") {
    if (!requireAdmin(req, res, true)) return;
    const body = await readBody(req);
    store.settings = {
      businessName: cleanText(body.businessName, 150) || "S&B Electronic Service",
      phone: normalizePhone(body.phone),
      lineUrl: cleanText(body.lineUrl, 300),
      announcement: cleanText(body.announcement, 300)
    };
    await saveStore();
    return sendJson(res, 200, { ok: true, settings: store.settings });
  }

  if (req.method === "POST" && pathname === "/api/admin/change-password") {
    if (!requireAdmin(req, res, true)) return;
    const body = await readBody(req);
    const currentPassword = String(body.currentPassword || "");
    const newPassword = String(body.newPassword || "");
    if (!await verifyPassword(currentPassword, store.admin.passwordHash)) return sendError(res, 400, "รหัสผ่านเดิมไม่ถูกต้อง");
    if (newPassword.length < 10 || !/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) {
      return sendError(res, 400, "รหัสผ่านใหม่ต้องมีอย่างน้อย 10 ตัว มีตัวอักษรและตัวเลข");
    }
    store.admin.passwordHash = await hashPassword(newPassword);
    store.admin.mustChangePassword = false;
    await saveStore();
    await fs.promises.rm(INITIAL_CREDENTIALS_FILE, { force: true });
    sessions.clear();
    return sendJson(res, 200, { ok: true, message: "เปลี่ยนรหัสผ่านแล้ว กรุณาเข้าสู่ระบบอีกครั้ง" }, {
      "Set-Cookie": "sb_admin=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0"
    });
  }

  return sendError(res, 404, "ไม่พบ API");
}

async function serveStatic(req, res, url) {
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") pathname = "/index.html";
  if (pathname === "/admin" || pathname === "/admin/") pathname = "/admin.html";

  const relativePath = pathname.replace(/^\/+/, "");
  const filePath = path.resolve(ROOT, relativePath);
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) return sendError(res, 403, "ไม่อนุญาต");

  try {
    let target = filePath;
    const stats = await fs.promises.stat(target);
    if (stats.isDirectory()) target = path.join(target, "index.html");
    const extension = path.extname(target).toLowerCase();
    const content = await fs.promises.readFile(target);
    res.writeHead(200, {
      "Content-Type": mimeTypes[extension] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Cache-Control": extension === ".html" ? "no-cache" : "public, max-age=3600"
    });
    if (req.method === "HEAD") return res.end();
    res.end(content);
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "ENOTDIR") {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      return res.end("<h1>404</h1><p>ไม่พบหน้าที่ต้องการ</p>");
    }
    throw error;
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    if (url.pathname.startsWith("/api/")) return await handleApi(req, res, url);
    if (!["GET", "HEAD"].includes(req.method)) return sendError(res, 405, "Method not allowed");
    await serveStatic(req, res, url);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) sendError(res, error.status || 500, error.status ? error.message : "เกิดข้อผิดพลาดในระบบ");
    else res.end();
  }
});

initializeStore().then(() => {
  server.listen(PORT, HOST, () => {
    console.log(`S&B website: http://${HOST}:${PORT}`);
    console.log(`Admin:       http://${HOST}:${PORT}/admin`);
  });
}).catch(error => {
  console.error("Cannot start server:", error);
  process.exitCode = 1;
});
