/**
 * S & B ELECTRONIC SERVICE COMPANY LIMITED
 * Shared Layout Components (Header, Footer, and Province-Specific Branch Content)
 */

// Global toggle for the mobile navigation menu
window.toggleMobileMenu = function() {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  
  if (mobileMenu) {
    const isHidden = mobileMenu.classList.toggle('hidden');
    if (menuIcon) {
      menuIcon.className = isHidden ? 'fa-solid fa-bars text-xl' : 'fa-solid fa-xmark text-xl';
    }
  }
};

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // 1. INJECT INLINE HELPER STYLES
  // ==========================================
  try {
    const customStyles = document.createElement('style');
    customStyles.textContent = `
      @media (min-width: 1024px) {
        .dropdown-hover:hover .dropdown-menu {
          display: block !important;
          animation: dropDownFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      }
      @keyframes dropDownFadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .hover-scale { transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
      .hover-scale:hover { transform: translateY(-2px) scale(1.02); }
      .hover-scale:active { transform: translateY(0) scale(0.98); }
      .image-container-fixed { position: relative; width: 100%; min-height: 150px; background-color: #0f172a; }
    `;
    document.head.appendChild(customStyles);
  } catch (e) { console.error("Styles injection failed:", e); }

  // ==========================================
  // 2. INJECT HEADER
  // ==========================================
  try {
    const headerTarget = document.getElementById('shared-header');
    if (headerTarget) {
      headerTarget.innerHTML = `
        <header class="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white sticky top-0 z-50 shadow-md">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
              <a href="index.html" class="flex items-center gap-3 group">
                <div>
                  <span class="block text-lg font-bold tracking-wider bg-gradient-to-r from-white via-slate-100 to-teal-300 bg-clip-text text-transparent">
                    S &amp; B ELECTRONIC SERVICE
                  </span>
                  <span class="block text-[10px] text-teal-300 tracking-widest uppercase font-semibold">
                    COMPANY LIMITED
                  </span>
                </div>
              </a>
              <img src="Images/logo_3d_transparent.png" alt="S&B Logo" class="object-contain max-h-20 w-auto" onerror="this.onerror=null; this.src='Images/logo_3d_transparent.png';" />
              <div class="hidden md:flex items-center gap-6">
                <div class="text-right">
                  <p class="text-xs text-slate-300">ปรึกษาด่วน/สั่งสินค้า</p>
                  <p class="text-sm font-bold text-teal-400">084-9125571</p>
                </div>
                <a href="tel:084-9125571" class="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                  <i class="fa-solid fa-phone-volume animate-bounce"></i>
                  <span>โทรด่วนตอนนี้</span>
                </a>
              </div>
              <div class="flex md:hidden">
                <button type="button" onclick="toggleMobileMenu()" class="text-slate-300 hover:text-white focus:outline-none p-2 rounded-lg bg-white/5 border border-white/10 transition-colors">
                  <i id="menu-icon" class="fa-solid fa-bars text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        </header>

        <nav class="bg-white border-b border-slate-150 relative z-40 shadow-sm">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul class="hidden lg:flex items-center gap-1">
              <li><a href="index.html" class="flex items-center gap-2 px-4 py-4 text-slate-700 hover:text-emerald-600 font-medium border-b-2 border-transparent hover:border-emerald-500 transition-all"><i class="fa-solid fa-house text-emerald-500"></i> หน้าหลัก</a></li>
              <li class="relative dropdown-hover">
                <button class="flex items-center gap-2 px-4 py-4 text-slate-700 hover:text-emerald-600 font-medium border-b-2 border-transparent hover:border-emerald-500 transition-all focus:outline-none">
                  <i class="fa-solid fa-coins text-amber-500"></i> สินค้าหยอดเหรียญ <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <ul class="dropdown-menu absolute hidden left-0 w-64 bg-white border border-slate-150 rounded-xl shadow-xl py-2 mt-0 text-slate-700 z-50">
                  <li><a href="product_2.html" class="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50/50 hover:text-emerald-600 transition-colors"><i class="fa-solid fa-droplet text-blue-500 w-5 text-center"></i> ตู้น้ำดื่มหยอดเหรียญ</a></li>
                  <li><a href="product_1.html" class="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50/50 hover:text-emerald-600 transition-colors"><i class="fa-solid fa-shirt text-indigo-500 w-5 text-center"></i> เครื่องซักผ้าหยอดเหรียญ</a></li>
                  <li><a href="product_3.html" class="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50/50 hover:text-emerald-600 transition-colors"><i class="fa-solid fa-shop text-teal-500 w-5 text-center"></i> ร้านสะดวกซัก</a></li>
                  <li><a href="product_4.html" class="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50/50 hover:text-emerald-600 transition-colors"><i class="fa-solid fa-gas-pump text-rose-500 w-5 text-center"></i> ตู้น้ำมันหยอดเหรียญ</a></li>
                  <li><a href="product_5.html" class="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50/50 hover:text-emerald-600 transition-colors"><i class="fa-solid fa-car text-sky-500 w-5 text-center"></i> ตู้ล้างรถหยอดเหรียญ</a></li>
                </ul>
              </li>
              <li class="relative dropdown-hover">
                <button class="flex items-center gap-2 px-4 py-4 text-slate-700 hover:text-emerald-600 font-medium border-b-2 border-transparent hover:border-emerald-500 transition-all focus:outline-none">
                  <i class="fa-solid fa-shield-halved text-teal-600"></i> การรับประกัน <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <ul class="dropdown-menu absolute hidden left-0 w-56 bg-white border border-slate-150 rounded-xl shadow-xl py-2 mt-0 text-slate-700 z-50">
                  <li><a href="sbservice.html" class="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50/50 hover:text-emerald-600 transition-colors"><i class="fa-solid fa-city text-emerald-500 w-5 text-center"></i> พื้นที่กรุงเทพฯ</a></li>
                  <li><a href="sbservice1.html" class="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50/50 hover:text-emerald-600 transition-colors"><i class="fa-solid fa-map-location-dot text-indigo-500 w-5 text-center"></i> พื้นที่ต่างจังหวัด</a></li>
                </ul>
              </li>
              <li><a href="gallery.html" class="flex items-center gap-2 px-4 py-4 text-slate-700 hover:text-emerald-600 font-medium border-b-2 border-transparent hover:border-emerald-500 transition-all"><i class="fa-solid fa-images text-purple-500"></i> ผลงาน / Gallery</a></li>
              <li class="relative dropdown-hover">
                <button class="flex items-center gap-2 px-4 py-4 text-slate-700 hover:text-emerald-600 font-medium border-b-2 border-transparent hover:border-emerald-500 transition-all focus:outline-none">
                  <i class="fa-solid fa-envelope text-rose-500"></i> ติดต่อเรา <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <ul class="dropdown-menu absolute hidden left-0 w-64 bg-white border border-slate-150 rounded-xl shadow-xl py-2 mt-0 text-slate-700 z-50">
                  <li><a href="contact.html" class="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50/50 hover:text-emerald-600 transition-colors"><i class="fa-solid fa-building text-emerald-500 w-5 text-center"></i> ศูนย์บริการกรุงเทพฯ</a></li>
                  <li><a href="contact3.html" class="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50/50 hover:text-emerald-600 transition-colors"><i class="fa-solid fa-map-location-dot text-indigo-500 w-5 text-center"></i> ศูนย์บริการต่างจังหวัด</a></li>
                </ul>
              </li>
            </ul>

            <div id="mobile-menu" class="hidden lg:hidden py-4 border-t border-slate-100 flex flex-col gap-2">
              <a href="index.html" class="px-4 py-2 hover:bg-slate-50 text-slate-700 font-medium rounded-lg flex items-center gap-2"><i class="fa-solid fa-house text-emerald-500"></i> หน้าหลัก</a>
              <div class="border-t border-slate-100 my-1"></div>
              <span class="px-4 py-1 text-xs font-bold uppercase text-slate-400 tracking-wider">หมวดหมู่สินค้าหยอดเหรียญ</span>
              <a href="product_2.html" class="px-6 py-1.5 hover:bg-slate-50 text-slate-600 rounded-lg flex items-center gap-2"><i class="fa-solid fa-droplet text-blue-500 w-4 text-center"></i> ตู้น้ำดื่มหยอดเหรียญ</a>
              <a href="product_1.html" class="px-6 py-1.5 hover:bg-slate-50 text-slate-600 rounded-lg flex items-center gap-2"><i class="fa-solid fa-shirt text-indigo-500 w-4 text-center"></i> เครื่องซักผ้าหยอดเหรียญ</a>
              <a href="product_3.html" class="px-6 py-1.5 hover:bg-slate-50 text-slate-600 rounded-lg flex items-center gap-2"><i class="fa-solid fa-shop text-teal-500 w-4 text-center"></i> ร้านสะดวกซัก</a>
              <a href="product_4.html" class="px-6 py-1.5 hover:bg-slate-50 text-slate-600 rounded-lg flex items-center gap-2"><i class="fa-solid fa-gas-pump text-rose-500 w-4 text-center"></i> ตู้น้ำมันหยอดเหรียญ</a>
              <a href="product_5.html" class="px-6 py-1.5 hover:bg-slate-50 text-slate-600 rounded-lg flex items-center gap-2"><i class="fa-solid fa-car text-sky-500 w-4 text-center"></i> ตู้ล้างรถหยอดเหรียญ</a>
              <div class="border-t border-slate-100 my-1"></div>
              <span class="px-4 py-1 text-xs font-bold uppercase text-slate-400 tracking-wider">บริการและการรับประกัน</span>
              <a href="sbservice.html" class="px-6 py-1.5 hover:bg-slate-50 text-slate-600 rounded-lg flex items-center gap-2"><i class="fa-solid fa-city text-emerald-500 w-4 text-center"></i> กรุงเทพฯ</a>
              <a href="sbservice1.html" class="px-6 py-1.5 hover:bg-slate-50 text-slate-600 rounded-lg flex items-center gap-2"><i class="fa-solid fa-map-location-dot text-indigo-500 w-4 text-center"></i> ต่างจังหวัด</a>
              <div class="border-t border-slate-100 my-1"></div>
              <a href="gallery.html" class="px-4 py-2 hover:bg-slate-50 text-slate-700 font-medium rounded-lg flex items-center gap-2"><i class="fa-solid fa-images text-purple-500"></i> ผลงาน / Gallery</a>
              <a href="contact3.html" class="px-4 py-2 hover:bg-slate-50 text-slate-700 font-medium rounded-lg flex items-center gap-2"><i class="fa-solid fa-envelope text-rose-500"></i> ช่องทางการติดต่อ</a>
            </div>
          </div>
        </nav>
      `;
    }
  } catch (e) { console.error("Header injection failed:", e); }

  // ==========================================
  // 3. INJECT REGIONAL BRANCH CONTENT
  // ==========================================
  try {
    const branchTarget = document.getElementById('shared-branch-content');
    if (branchTarget) {
      const province = branchTarget.getAttribute('data-province') || 'อุดรธานี';
      const locationInfo = branchTarget.getAttribute('data-location') || `ในพื้นที่จังหวัด${province}และใกล้เคียง`;
      const specificZone = branchTarget.getAttribute('data-specific-zone') || `สำหรับลูกค้าในตัวเมือง${province}`;

      // ปรับปรุงระบบ Fallback: รองรับทั้งแบบระบุขีด (data-img-X) และไม่มีขีด (data-imgX) เพื่อความปลอดภัยสูงสุด
      const img1 = branchTarget.getAttribute('data-img-1') || branchTarget.getAttribute('data-img1') || 'Images/sb_service_updated.png';
      const img2 = branchTarget.getAttribute('data-img-2') || branchTarget.getAttribute('data-img2') || 'Images/sb_service_updated1.jpg';
      const img3 = branchTarget.getAttribute('data-img-3') || branchTarget.getAttribute('data-img3') || 'Images/sb_service_updated2.jpg';
      const img4 = branchTarget.getAttribute('data-img-4') || branchTarget.getAttribute('data-img4') || 'Images/sb_service_updated3.jpg';
      const img5 = branchTarget.getAttribute('data-img-5') || branchTarget.getAttribute('data-img5') || 'Images/sb_service_updated4.jpg';
      const img6 = branchTarget.getAttribute('data-img-6') || branchTarget.getAttribute('data-img6') || 'Images/Ro3.jpg';
      const img7 = branchTarget.getAttribute('data-img-7') || branchTarget.getAttribute('data-img7') || 'Images/sb_service_new_brochure.png';
      const img8 = branchTarget.getAttribute('data-img-8') || branchTarget.getAttribute('data-img8') || 'Images/SSS.png';
      const img9 = branchTarget.getAttribute('data-img-9') || branchTarget.getAttribute('data-img9') || 'Images/oil.jpg';
      const img10 = branchTarget.getAttribute('data-img-10') || branchTarget.getAttribute('data-img10') || 'Images/sbservice_ad_1x1.png';

      branchTarget.innerHTML = `
        <section class="relative bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white py-16 px-4 overflow-hidden border-b border-teal-500/20">
          <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div class="max-w-5xl mx-auto text-center relative z-10 space-y-4">
            <span class="inline-block bg-teal-500/10 text-teal-300 border border-teal-500/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">Official Service Center</span>
            <h1 class="text-3xl md:text-5xl font-black tracking-tight leading-tight">ศูนย์บริการ S&B Electronic Service <br class="hidden md:block"><span class="bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">ประจำจังหวัด${province}</span></h1>
            <p class="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-light">ศูนย์รวมและติดตั้งธุรกิจหยอดเหรียญครบวงจร ราคาเดียวกันทั่วประเทศ <br><span class="text-white font-medium underline decoration-teal-400 underline-offset-4">${locationInfo}</span></p>
          </div>
        </section>

        <section class="w-full bg-slate-900 py-8 px-4 sm:px-6 md:px-8">
          <div class="max-w-7xl mx-auto flex flex-col gap-10">
            <div class="w-full overflow-hidden group relative rounded-xl shadow-lg bg-slate-950">
              <a href="index.html" class="block w-full h-full"><img src="${img1}" alt="S&B ${province}" class="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.015]" onerror="this.onerror=null; this.src='Images/sb_service_updated.png';"><div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm z-10">ภาพที่ 1: S&B Electronic Service</div></a>
            </div>
            <div class="w-full overflow-hidden group relative rounded-xl shadow-lg bg-slate-950">
              <a href="product_1.html" class="block w-full h-full"><img src="${img2}" alt="S&B ${province}" class="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.015]" onerror="this.onerror=null; this.src='Images/sb_service_updated1.jpg';"><div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm z-10">ภาพที่ 2: เครื่องซักผ้าหยอดเหรียญฝาบน</div></a>
            </div>
            <div class="w-full overflow-hidden group relative rounded-xl shadow-lg bg-slate-950">
              <a href="product_1.html" class="block w-full h-full"><img src="${img3}" alt="S&B ${province}" class="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.015]" onerror="this.onerror=null; this.src='Images/sb_service_updated2.jpg';"><div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm z-10">ภาพที่ 3: เครื่องซักผ้าหยอดเหรียญฝาหน้า</div></a>
            </div>
            <div class="w-full overflow-hidden group relative rounded-xl shadow-lg bg-slate-950">
              <a href="product_1.html" class="block w-full h-full"><img src="${img4}" alt="S&B ${province}" class="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.015]" onerror="this.onerror=null; this.src='Images/sb_service_updated3.jpg';"><div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm z-10">ภาพที่ 4: เครื่องซักผ้าหยอดเหรียญกึ่งอุตสาหกรรม</div></a>
            </div>
            <div class="w-full overflow-hidden group relative rounded-xl shadow-lg bg-slate-950">
              <a href="product_1.html" class="block w-full h-full"><img src="${img5}" alt="S&B ${province}" class="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.015]" onerror="this.onerror=null; this.src='Images/sb_service_updated4.jpg';"><div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm z-10">ภาพที่ 5: เครื่องอบผ้าหยอดเหรียญ WHIRLPOOL</div></a>
            </div>
            <div class="w-full overflow-hidden group relative rounded-xl shadow-lg bg-slate-950">
              <a href="product_2.html" class="block w-full h-full"><img src="${img6}" alt="S&B ${province}" class="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.015]" onerror="this.onerror=null; this.src='Images/Ro3.jpg';"><div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm z-10">ภาพที่ 6: ตู้น้ำดื่มหยอดเหรียญ ขนาดถังเก็บ 100 ลิตร</div></a>
            </div>
            <div class="w-full overflow-hidden group relative rounded-xl shadow-lg bg-slate-950">
              <a href="product_2.html" class="block w-full h-full"><img src="${img7}" alt="S&B ${province}" class="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.015]" onerror="this.onerror=null; this.src='Images/sb_service_new_brochure.png';"><div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm z-10">ภาพที่ 7: ตู้น้ำดื่มหยอดเหรียญ ขนาดถังเก็บ 200 ลิตร</div></a>
            </div>
            <div class="w-full overflow-hidden group relative rounded-xl shadow-lg bg-slate-950">
              <a href="product_3.html" class="block w-full h-full"><img src="${img8}" alt="S&B ${province}" class="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.015]" onerror="this.onerror=null; this.src='Images/SSS.png';"><div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm z-10">ภาพที่ 8: ธุรกิจร้านสะดวกซัก</div></a>
            </div>
            <div class="w-full overflow-hidden group relative rounded-xl shadow-lg bg-slate-950">
              <a href="product_4.html" class="block w-full h-full"><img src="${img9}" alt="S&B ${province}" class="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.015]" onerror="this.onerror=null; this.src='Images/oil.jpg';"><div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm z-10">ภาพที่ 9: ตู้น้ำมันหยอดเหรียญ</div></a>
            </div>
            <div class="w-full overflow-hidden group relative rounded-xl shadow-lg bg-slate-950">
              <a href="product_5.html" class="block w-full h-full"><img src="${img10}" alt="S&B ${province}" class="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.015]" onerror="this.onerror=null; this.src='Images/sbservice_ad_1x1.png';"><div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm z-10">ภาพที่ 10: ตู้ล้างรถหยอดเหรียญ</div></a>
            </div>
          </div>
        </section>

        <section class="max-w-6xl mx-auto px-4 py-16">
          <div class="bg-gradient-to-br from-white to-slate-50 border border-slate-100 rounded-3xl shadow-xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div class="lg:col-span-7 space-y-4">
              <h3 class="text-2xl md:text-3xl font-bold text-slate-900">พร้อมเริ่มธุรกิจหยอดเหรียญที่ <span class="text-emerald-600">${province}</span> หรือยัง?</h3>
              <p class="text-slate-600 leading-relaxed">ทีมงานผู้เชี่ยวชาญพร้อมดูแลคุณในทุกขั้นตอน ตั้งแต่ให้คำปรึกษาเลือกทำเล จัดส่ง ติดตั้งระบบ ไปจนถึงบริการดูแลบำรุงรักษาตลอดอายุการใช้งาน ${specificZone} มั่นใจได้ในมาตรฐานที่เป็นหนึ่งเดียวทั่วประเทศ</p>
              <div class="inline-flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-100 px-4 py-2 rounded-xl font-medium"><i class="fa-solid fa-truck-fast"></i> สิทธิพิเศษ: ฟรีค่าจัดส่งและติดตั้งในเขตพื้นที่ดูแลของสาขา</div>
            </div>
            <div class="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 justify-end w-full">
              <a href="tel:0849125571" class="hover-scale inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg text-center text-lg"><i class="fa-solid fa-phone-volume animate-bounce"></i> โทรสายด่วน: 084-912-5571</a>
              <a href="https://line.me/R/ti/p/%40ioa4439m" target="_blank" class="hover-scale inline-flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold px-8 py-4 rounded-2xl shadow-lg text-center text-lg"><i class="fa-brands fa-line text-2xl"></i> สอบถามทาง Line Official</a>
            </div>
          </div>
        </section>
      `;
    }
  } catch (e) { console.error("Branch content injection failed:", e); }

  // ==========================================
  // 4. INJECT FOOTER
  // ==========================================
  try {
    const footerTarget = document.getElementById('shared-footer');
    if (footerTarget) {
      footerTarget.innerHTML = `
        <footer class="bg-gradient-to-b from-slate-900 to-slate-950 text-white pt-16 pb-8 border-t-4 border-emerald-500">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div class="space-y-4">
                <div class="flex items-center gap-2">
                  <img src="Images/logo_3d_transparent.png" class="h-10 w-auto object-contain" alt="Logo" onerror="this.onerror=null; this.src='Images/logo_3d_transparent.png';">
                  <h4 class="text-md font-bold uppercase tracking-wider text-teal-400">บริษัท เอส แอนด์ บี</h4>
                </div>
                <h5 class="text-sm font-semibold text-slate-200">เอส แอนด์ บี อีเล็คโทรนิคส์ เซอร์วิส จำกัด</h5>
                <p class="text-xs text-slate-400 leading-relaxed">S &amp; B ELECTRONIC SERVICE COMPANY LIMITED <br><br>เลขที่ 120/288 หมู่ที่ 5 ตำบลบางเดื่อ อำเภอเมืองปทุม จังหวัดปทุมธานี 12000</p>
              </div>
              <div class="space-y-4">
                <h4 class="text-md font-bold uppercase tracking-wider text-teal-400">ฝ่ายขายและการติดต่อ</h4>
                <ul class="space-y-2.5 text-xs text-slate-300">
                  <li class="flex items-center gap-2 text-rose-400 font-bold"><i class="fa-solid fa-phone text-sm"></i><span>สายด่วน: 084-912-5571</span></li>
                  <li class="flex items-center gap-2 text-slate-300"><i class="fa-solid fa-phone-flip text-slate-400"></i><span>เบอร์สำนักงาน: 02-7313318</span></li>
                  <li class="flex items-center gap-2 hover:text-white transition-colors"><i class="fa-solid fa-envelope text-slate-400"></i><a href="mailto:s_b_service@hotmail.com">s_b_service@hotmail.com</a></li>
                </ul>
              </div>
              <div class="space-y-4">
                <h4 class="text-md font-bold uppercase tracking-wider text-teal-400">ติดตามเรา</h4>
                <p class="text-xs text-slate-400 leading-relaxed">ติดตามข่าวสาร โปรโมชั่นสุดพิเศษ และผลงานการติดตั้งตู้หยอดเหรียญล่าสุด</p>
                <div class="flex flex-col gap-2 pt-1 text-xs">
                  <a href="http://www.facebook.com/SBService2012" target="_blank" class="flex items-center gap-2 text-slate-300 hover:text-teal-300 transition-colors"><i class="fa-brands fa-square-facebook text-blue-500 text-lg"></i><span>🔗 Facebook: S&B SERVICE</span></a>
                  <a href="https://line.me/R/ti/p/%40ioa4439m" target="_blank" class="flex items-center gap-2 text-slate-300 hover:text-teal-300 transition-colors"><i class="fa-brands fa-line text-green-500 text-lg"></i><span>📱 Line Official: @sbservice</span></a>
                </div>
              </div>
              <div class="space-y-4">
                <h4 class="text-md font-bold uppercase tracking-wider text-teal-400">เมนูหลัก</h4>
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <a href="index.html" class="text-slate-300 hover:text-white hover:underline transition-all">หน้าหลัก</a>
                  <a href="gallery.html" class="text-slate-300 hover:text-white hover:underline transition-all">Gallery</a>
                  <a href="contact.html" class="text-slate-300 hover:text-white hover:underline transition-all">ติดต่อเรา</a>
                  <a href="sbservice.html" class="text-slate-300 hover:text-white hover:underline transition-all">บริการหลังการขาย</a>
                  <a href="product_1.html" class="text-slate-300 hover:text-white hover:underline transition-all">เครื่องซักผ้าหยอดเหรียญ</a>
                  <a href="product_2.html" class="text-slate-300 hover:text-white hover:underline transition-all">ตู้น้ำดื่มหยอดเหรียญ</a>
                </div>
              </div>
            </div>
            <div class="border-t border-slate-800 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
              <p>&copy; 2026 บริษัท เอส แอนด์ บี อีเล็คโทรนิคส์ เซอร์วิส จำกัด สงวนลิขสิทธิ์ทั้งหมด</p>
              <div class="flex gap-4"><span class="text-[10px] text-slate-500">Designed &amp; Maintained with Professional standard</span></div>
            </div>
          </div>
        </footer>
      `;
    }
  } catch (e) { console.error("Footer injection failed:", e); }
});
