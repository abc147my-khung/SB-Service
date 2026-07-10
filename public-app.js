(() => {
  "use strict";

  async function request(url, options) {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json", ...(options && options.headers) },
      ...options
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "ไม่สามารถเชื่อมต่อระบบได้");
    return data;
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    })[character]);
  }

  function buildSection(products) {
    const options = products.map(item =>
      `<option value="${escapeHtml(item.name)}">${escapeHtml(item.name)}</option>`
    ).join("");

    const section = document.createElement("section");
    section.id = "inquiry";
    section.className = "sb-inquiry";
    section.innerHTML = `
      <style>
        .sb-inquiry{font-family:'Anakotmai',sans-serif;background:linear-gradient(135deg,#ecfdf5,#eff6ff);padding:64px 20px}
        .sb-inquiry__wrap{max-width:1100px;margin:auto;display:grid;grid-template-columns:.85fr 1.15fr;gap:32px;align-items:start}
        .sb-inquiry__copy h2{font-size:clamp(28px,4vw,44px);line-height:1.15;font-weight:800;color:#0f172a;margin:0 0 16px}
        .sb-inquiry__copy p{color:#475569;font-size:18px;line-height:1.75}
        .sb-inquiry__badge{display:inline-flex;background:#d1fae5;color:#047857;font-weight:700;border-radius:999px;padding:7px 14px;margin-bottom:18px}
        .sb-inquiry__form{background:#fff;border:1px solid #dbeafe;border-radius:24px;padding:28px;box-shadow:0 20px 60px rgba(15,23,42,.1)}
        .sb-inquiry__grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .sb-inquiry label{display:block;color:#334155;font-weight:700;margin-bottom:6px}
        .sb-inquiry input,.sb-inquiry select,.sb-inquiry textarea{width:100%;border:1px solid #cbd5e1;border-radius:12px;padding:12px 14px;color:#0f172a;background:#fff;outline:none}
        .sb-inquiry input:focus,.sb-inquiry select:focus,.sb-inquiry textarea:focus{border-color:#10b981;box-shadow:0 0 0 3px rgba(16,185,129,.14)}
        .sb-inquiry__field{margin-bottom:16px}.sb-inquiry__full{grid-column:1/-1}
        .sb-inquiry button{width:100%;border:0;border-radius:13px;background:linear-gradient(90deg,#059669,#0d9488);color:#fff;padding:14px;font-size:17px;font-weight:800;cursor:pointer}
        .sb-inquiry button:disabled{opacity:.65;cursor:wait}.sb-inquiry__result{min-height:24px;margin-top:12px;font-weight:700}
        .sb-inquiry__hp{position:absolute!important;left:-9999px!important}
        .sb-announcement{background:#fef3c7;color:#92400e;text-align:center;padding:10px 18px;font-weight:700}
        @media(max-width:760px){.sb-inquiry__wrap,.sb-inquiry__grid{grid-template-columns:1fr}.sb-inquiry{padding:44px 16px}.sb-inquiry__form{padding:20px}}
      </style>
      <div class="sb-inquiry__wrap">
        <div class="sb-inquiry__copy">
          <span class="sb-inquiry__badge">ให้เจ้าหน้าที่ติดต่อกลับ</span>
          <h2>สนใจสินค้า หรืออยากเริ่มธุรกิจ?</h2>
          <p>ฝากข้อมูลไว้ได้เลย ทีมงาน S&amp;B จะช่วยแนะนำรุ่น งบประมาณ และบริการติดตั้งที่เหมาะกับพื้นที่ของคุณ</p>
        </div>
        <form class="sb-inquiry__form" id="sb-inquiry-form">
          <div class="sb-inquiry__grid">
            <div class="sb-inquiry__field">
              <label for="sb-name">ชื่อผู้ติดต่อ *</label>
              <input id="sb-name" name="name" autocomplete="name" required maxlength="100">
            </div>
            <div class="sb-inquiry__field">
              <label for="sb-phone">เบอร์โทร *</label>
              <input id="sb-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20">
            </div>
            <div class="sb-inquiry__field">
              <label for="sb-province">จังหวัด</label>
              <input id="sb-province" name="province" autocomplete="address-level1" maxlength="100">
            </div>
            <div class="sb-inquiry__field">
              <label for="sb-product">สินค้าที่สนใจ</label>
              <select id="sb-product" name="product">
                <option value="">ยังไม่แน่ใจ / ขอคำแนะนำ</option>
                ${options}
              </select>
            </div>
            <div class="sb-inquiry__field sb-inquiry__full">
              <label for="sb-message">รายละเอียดเพิ่มเติม</label>
              <textarea id="sb-message" name="message" rows="4" maxlength="1000" placeholder="เช่น งบประมาณ พื้นที่ติดตั้ง หรือช่วงเวลาที่สะดวกให้ติดต่อ"></textarea>
            </div>
            <input class="sb-inquiry__hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
          </div>
          <button type="submit">ส่งข้อมูลให้เจ้าหน้าที่</button>
          <p class="sb-inquiry__result" role="status" aria-live="polite"></p>
        </form>
      </div>
    `;
    return section;
  }

  async function start() {
    try {
      const [settingsData, productsData] = await Promise.all([
        request("/api/public/settings"),
        request("/api/public/products")
      ]);

      const announcement = settingsData.settings && settingsData.settings.announcement;
      if (announcement) {
        const bar = document.createElement("div");
        bar.className = "sb-announcement";
        bar.textContent = announcement;
        document.body.prepend(bar);
      }

      const footer = document.getElementById("shared-footer");
      const section = buildSection(productsData.products || []);
      if (footer) footer.before(section);
      else document.body.append(section);

      const form = document.getElementById("sb-inquiry-form");
      form.addEventListener("submit", async event => {
        event.preventDefault();
        const button = form.querySelector("button");
        const result = form.querySelector(".sb-inquiry__result");
        const payload = Object.fromEntries(new FormData(form).entries());
        button.disabled = true;
        button.textContent = "กำลังส่ง...";
        result.textContent = "";
        result.style.color = "#047857";
        try {
          const data = await request("/api/inquiries", {
            method: "POST",
            body: JSON.stringify(payload)
          });
          form.reset();
          result.textContent = data.message || "ส่งข้อมูลเรียบร้อย";
        } catch (error) {
          result.style.color = "#b91c1c";
          result.textContent = error.message;
        } finally {
          button.disabled = false;
          button.textContent = "ส่งข้อมูลให้เจ้าหน้าที่";
        }
      });
    } catch {
      // เว็บไซต์เดิมยังใช้งานได้เมื่อเปิดเป็นไฟล์ โดยซ่อนเฉพาะส่วนที่ต้องใช้เซิร์ฟเวอร์
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
