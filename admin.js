(() => {
  "use strict";

  const state = { user: null, products: [], inquiries: [] };
  const titles = {
    dashboard: "ภาพรวม",
    inquiries: "ลูกค้าที่ติดต่อ",
    products: "สินค้า",
    settings: "ตั้งค่าเว็บไซต์",
    security: "ความปลอดภัย"
  };

  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    })[character]);
  }

  function dateTime(value) {
    if (!value) return "-";
    return new Intl.DateTimeFormat("th-TH", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
  }

  function toast(message, error = false) {
    const element = $("#toast");
    element.textContent = message;
    element.className = `toast show${error ? " error" : ""}`;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => element.className = "toast", 2800);
  }

  async function request(url, options = {}) {
    const isMutation = options.method && options.method !== "GET";
    const response = await fetch(url, {
      credentials: "same-origin",
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(isMutation ? { "X-Admin-Request": "1" } : {}),
        ...(options.headers || {})
      }
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (response.status === 401 && !url.endsWith("/login")) showLogin();
      throw new Error(data.message || "เกิดข้อผิดพลาด");
    }
    return data;
  }

  function showLogin() {
    state.user = null;
    $("#app-view").classList.add("hidden");
    $("#login-view").classList.remove("hidden");
  }

  function showApp(user) {
    state.user = user;
    $("#username").textContent = user.username;
    $("#password-warning").classList.toggle("hidden", !user.mustChangePassword);
    $("#login-view").classList.add("hidden");
    $("#app-view").classList.remove("hidden");
    navigate("dashboard");
  }

  async function checkSession() {
    try {
      const data = await request("/api/admin/me");
      showApp(data.user);
    } catch {
      showLogin();
    }
  }

  function navigate(page) {
    $$(".page").forEach(element => element.classList.toggle("active", element.id === `page-${page}`));
    $$(".nav-item").forEach(element => element.classList.toggle("active", element.dataset.page === page));
    $("#page-title").textContent = titles[page] || "";
    $(".sidebar").classList.remove("open");
    if (page === "dashboard") loadDashboard();
    if (page === "inquiries") loadInquiries();
    if (page === "products") loadProducts();
    if (page === "settings") loadSettings();
  }

  function inquiryRows(items, compact = false) {
    if (!items.length) return '<div class="empty-state">ยังไม่มีข้อมูลลูกค้า</div>';
    const statusLabel = { new: "รอติดต่อ", contacted: "ติดต่อแล้ว", closed: "ปิดงาน" };
    return `
      <table class="data-table">
        <thead><tr><th>ลูกค้า</th><th>ความสนใจ</th><th>วันที่</th><th>สถานะ</th>${compact ? "" : "<th>จัดการ</th>"}</tr></thead>
        <tbody>
          ${items.map(item => `
            <tr>
              <td><div class="cell-title">${escapeHtml(item.name)}</div><a href="tel:${escapeHtml(item.phone)}">${escapeHtml(item.phone)}</a><div class="cell-sub">${escapeHtml(item.province || "-")}</div></td>
              <td><div class="cell-title">${escapeHtml(item.product || "ขอคำแนะนำ")}</div><div class="cell-sub">${escapeHtml(item.message || "-")}</div></td>
              <td>${dateTime(item.createdAt)}</td>
              <td><span class="status status-${item.status}">${statusLabel[item.status] || item.status}</span></td>
              ${compact ? "" : `<td><div class="actions">
                ${item.status === "new" ? `<button class="btn btn-small btn-secondary" data-inquiry-status="contacted" data-id="${item.id}">ติดต่อแล้ว</button>` : ""}
                ${item.status !== "closed" ? `<button class="btn btn-small btn-secondary" data-inquiry-status="closed" data-id="${item.id}">ปิดงาน</button>` : ""}
                <button class="btn btn-small btn-danger" data-delete-inquiry="${item.id}">ลบ</button>
              </div></td>`}
            </tr>
          `).join("")}
        </tbody>
      </table>`;
  }

  async function loadDashboard() {
    try {
      const data = await request("/api/admin/dashboard");
      $("#stat-inquiries").textContent = data.stats.inquiries;
      $("#stat-new").textContent = data.stats.newInquiries;
      $("#stat-active-products").textContent = data.stats.activeProducts;
      $("#stat-products").textContent = data.stats.totalProducts;
      $("#recent-inquiries").innerHTML = inquiryRows(data.recent, true);
    } catch (error) {
      toast(error.message, true);
    }
  }

  async function loadInquiries() {
    const status = $("#inquiry-status").value;
    const search = $("#inquiry-search").value.trim();
    try {
      const data = await request(`/api/admin/inquiries?status=${encodeURIComponent(status)}&q=${encodeURIComponent(search)}`);
      state.inquiries = data.inquiries;
      $("#inquiries-list").innerHTML = inquiryRows(data.inquiries);
    } catch (error) {
      toast(error.message, true);
    }
  }

  async function updateInquiry(id, status) {
    try {
      await request(`/api/admin/inquiries/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
      toast("อัปเดตสถานะแล้ว");
      loadInquiries();
    } catch (error) {
      toast(error.message, true);
    }
  }

  async function deleteInquiry(id) {
    if (!confirm("ลบข้อมูลลูกค้ารายการนี้หรือไม่?")) return;
    try {
      await request(`/api/admin/inquiries/${id}`, { method: "DELETE" });
      toast("ลบรายการแล้ว");
      loadInquiries();
    } catch (error) {
      toast(error.message, true);
    }
  }

  function productRows(items) {
    if (!items.length) return '<div class="empty-state">ยังไม่มีสินค้า</div>';
    return `
      <table class="data-table">
        <thead><tr><th>สินค้า</th><th>หมวดหมู่</th><th>หน้าเว็บ</th><th>สถานะ</th><th>จัดการ</th></tr></thead>
        <tbody>
          ${items.map(item => `
            <tr>
              <td><div class="cell-title">${escapeHtml(item.name)}</div></td>
              <td>${escapeHtml(item.category || "-")}</td>
              <td>${item.page ? `<a href="/${encodeURI(item.page)}" target="_blank" rel="noopener">${escapeHtml(item.page)} ↗</a>` : "-"}</td>
              <td><span class="status status-${item.status}">${item.status === "active" ? "เปิดแสดง" : "ซ่อน"}</span></td>
              <td><div class="actions"><button class="btn btn-small btn-secondary" data-edit-product="${item.id}">แก้ไข</button><button class="btn btn-small btn-danger" data-delete-product="${item.id}">ลบ</button></div></td>
            </tr>
          `).join("")}
        </tbody>
      </table>`;
  }

  async function loadProducts() {
    try {
      const data = await request("/api/admin/products");
      state.products = data.products;
      $("#products-list").innerHTML = productRows(data.products);
    } catch (error) {
      toast(error.message, true);
    }
  }

  function openProduct(product = {}) {
    const form = $("#product-form");
    form.reset();
    form.elements.id.value = product.id || "";
    form.elements.name.value = product.name || "";
    form.elements.category.value = product.category || "";
    form.elements.page.value = product.page || "";
    form.elements.status.value = product.status || "active";
    $("#product-dialog-title").textContent = product.id ? "แก้ไขสินค้า" : "เพิ่มสินค้า";
    $("#product-dialog").showModal();
  }

  async function saveProduct(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const id = values.id;
    delete values.id;
    try {
      await request(id ? `/api/admin/products/${id}` : "/api/admin/products", {
        method: id ? "PUT" : "POST",
        body: JSON.stringify(values)
      });
      $("#product-dialog").close();
      toast("บันทึกสินค้าแล้ว");
      loadProducts();
    } catch (error) {
      toast(error.message, true);
    }
  }

  async function deleteProduct(id) {
    if (!confirm("ลบสินค้านี้หรือไม่?")) return;
    try {
      await request(`/api/admin/products/${id}`, { method: "DELETE" });
      toast("ลบสินค้าแล้ว");
      loadProducts();
    } catch (error) {
      toast(error.message, true);
    }
  }

  async function loadSettings() {
    try {
      const data = await request("/api/admin/settings");
      const form = $("#settings-form");
      Object.entries(data.settings).forEach(([key, value]) => {
        if (form.elements[key]) form.elements[key].value = value || "";
      });
    } catch (error) {
      toast(error.message, true);
    }
  }

  async function saveSettings(event) {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      await request("/api/admin/settings", {
        method: "PUT",
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries()))
      });
      toast("บันทึกการตั้งค่าแล้ว");
    } catch (error) {
      toast(error.message, true);
    }
  }

  async function changePassword(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    if (values.newPassword !== values.confirmPassword) return toast("ยืนยันรหัสผ่านใหม่ไม่ตรงกัน", true);
    try {
      const data = await request("/api/admin/change-password", {
        method: "POST",
        body: JSON.stringify({ currentPassword: values.currentPassword, newPassword: values.newPassword })
      });
      form.reset();
      toast(data.message);
      setTimeout(showLogin, 1000);
    } catch (error) {
      toast(error.message, true);
    }
  }

  $("#login-form").addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const button = form.querySelector("button");
    $("#login-error").textContent = "";
    button.disabled = true;
    try {
      const data = await request("/api/admin/login", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
        headers: {}
      });
      form.reset();
      showApp(data.user);
    } catch (error) {
      $("#login-error").textContent = error.message;
    } finally {
      button.disabled = false;
    }
  });

  $("#main-nav").addEventListener("click", event => {
    const button = event.target.closest("[data-page]");
    if (button) navigate(button.dataset.page);
  });
  document.addEventListener("click", event => {
    const go = event.target.closest("[data-go]");
    if (go) navigate(go.dataset.go);
    const status = event.target.closest("[data-inquiry-status]");
    if (status) updateInquiry(status.dataset.id, status.dataset.inquiryStatus);
    const deleteInquiryButton = event.target.closest("[data-delete-inquiry]");
    if (deleteInquiryButton) deleteInquiry(deleteInquiryButton.dataset.deleteInquiry);
    const editProductButton = event.target.closest("[data-edit-product]");
    if (editProductButton) openProduct(state.products.find(item => item.id === editProductButton.dataset.editProduct));
    const deleteProductButton = event.target.closest("[data-delete-product]");
    if (deleteProductButton) deleteProduct(deleteProductButton.dataset.deleteProduct);
  });

  $("#menu-button").addEventListener("click", () => $(".sidebar").classList.toggle("open"));
  $("#logout-button").addEventListener("click", async () => {
    await request("/api/admin/logout", { method: "POST" }).catch(() => {});
    showLogin();
  });
  $("#inquiry-status").addEventListener("change", loadInquiries);
  $("#inquiry-search").addEventListener("input", () => {
    clearTimeout(loadInquiries.timer);
    loadInquiries.timer = setTimeout(loadInquiries, 250);
  });
  $("#add-product-button").addEventListener("click", () => openProduct());
  $("#close-product-dialog").addEventListener("click", () => $("#product-dialog").close());
  $("#cancel-product").addEventListener("click", () => $("#product-dialog").close());
  $("#product-form").addEventListener("submit", saveProduct);
  $("#settings-form").addEventListener("submit", saveSettings);
  $("#password-form").addEventListener("submit", changePassword);

  checkSession();
})();
