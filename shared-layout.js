/**
 * S & B ELECTRONIC SERVICE COMPANY LIMITED
 * Shared Layout Components (Header, Footer, and Province-Specific Branch Content)
 * * This file dynamically injects highly polished, responsive navigation headers, footers, 
 * and dynamic branch templates into pages containing the respective element IDs.
 */

// Global toggle for the mobile navigation menu (used by inline onclick attributes)
window.toggleMobileMenu = function() {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  
  if (mobileMenu) {
    const isHidden = mobileMenu.classList.toggle('hidden');
    
    // Toggle the icon style between 'bars' and 'close (xmark)'
    if (menuIcon) {
      if (isHidden) {
        menuIcon.className = 'fa-solid fa-bars text-xl';
      } else {
        menuIcon.className = 'fa-solid fa-xmark text-xl';
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // 1. INJECT INLINE HELPER STYLES
  // ==========================================
  // Injects critical animations and styling rules programmatically to keep files self-contained.
  const customStyles = document.createElement('style');
  customStyles.textContent = `
    /* Desktop Dropdown Hover Effect with Fade-in Animation */
    @media (min-width: 1024px) {
      .dropdown-hover:hover .dropdown-menu {
        display: block !important;
        animation: dropDownFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
    }
    @keyframes dropDownFadeIn {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    /* Universal Smooth Transition Scale */
    .hover-scale {
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .hover-scale:hover {
      transform: translateY(-2px) scale(1.02);
    }
    .hover-scale:active {
      transform: translateY(0) scale(0.98);
    }
    /* Anti-Layout Shift Layer */
    .image-container-fixed {
      position: relative;
      width: 100%;
      min-height: 150px; /* à¸›à¹‰à¸­à¸‡à¸à¸±à¸™à¸à¸²à¸£à¸¢à¸¸à¸šà¸•à¸±à¸§à¸Šà¸±à¹ˆà¸§à¸„à¸£à¸²à¸§à¸à¹ˆà¸­à¸™à¸ à¸²à¸žà¹‚à¸«à¸¥à¸” */
      background-color: #0f172a;
    }
  `;
  document.head.appendChild(customStyles);

  // ==========================================
  // 2. INJECT HEADER
  // ==========================================
  const headerTarget = document.getElementById('shared-header');
  if (headerTarget) {
    headerTarget.innerHTML = `
      <header class="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white sticky top-0 z-50 shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-20">
            <!-- Brand Identity with Modern Logo -->
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
<img 
  src="Images/logo_3d_transparent.png" 
  alt="S&B Logo" 
  class="object-contain max-h-20 w-auto" 
  onerror="this.onerror=null; this.src='Picture/logo_3d_transparent.png';" 
/>
            <!-- Contact & Action Button -->
            <div class="hidden md:flex items-center gap-6">
              <div class="text-right">
                <p class="text-xs text-slate-300">à¸›à¸£à¸¶à¸à¸©à¸²à¸”à¹ˆà¸§à¸™/à¸ªà¸±à¹ˆà¸‡à¸ªà¸´à¸™à¸„à¹‰à¸²</p>
                <p class="text-sm font-bold text-teal-400">084-9125571</p>
              </div>
              <a href="tel:084-9125571" class="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                <i class="fa-solid fa-phone-volume animate-bounce"></i>
                <span>à¹‚à¸—à¸£à¸”à¹ˆà¸§à¸™à¸•à¸­à¸™à¸™à¸µà¹‰</span>
              </a>
            </div>

            <!-- Mobile Menu Button -->
            <div class="flex md:hidden">
              <button type="button" onclick="toggleMobileMenu()" class="text-slate-300 hover:text-white focus:outline-none p-2 rounded-lg bg-white/5 border border-white/10 transition-colors">
                <i id="menu-icon" class="fa-solid fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Navigation Menu (Desktop & Mobile) -->
      <nav class="bg-white border-b border-slate-150 relative z-40 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Desktop Navigation with optimized icons -->
          <ul class="hidden lg:flex items-center gap-1">
            <li>
              <a href="index.html" class="flex items-center gap-2 px-4 py-4 text-slate-700 hover:text-emerald-600 font-medium border-b-2 border-transparent hover:border-emerald-500 transition-all">
                <i class="fa-solid fa-house text-emerald-500"></i> à¸«à¸™à¹‰à¸²à¸«à¸¥à¸±à¸
              </a>
            </li>
            
            <!-- Submenu: à¸ªà¸´à¸™à¸„à¹‰à¸²à¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸ -->
            <li class="relative dropdown-hover">
              <button class="flex items-center gap-2 px-4 py-4 text-slate-700 hover:text-emerald-600 font-medium border-b-2 border-transparent hover:border-emerald-500 transition-all focus:outline-none">
                <i class="fa-solid fa-coins text-amber-500"></i> à¸ªà¸´à¸™à¸„à¹‰à¸²à¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸ <i class="fa-solid fa-chevron-down text-[10px]"></i>
              </button>
              <!-- Dropdown Menu -->
              <ul class="dropdown-menu absolute hidden left-0 w-64 bg-white border border-slate-150 rounded-xl shadow-xl py-2 mt-0 text-slate-700 z-50">
                <li><a href="product_2.html" class="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50/50 hover:text-emerald-600 transition-colors"><i class="fa-solid fa-droplet text-blue-500 w-5 text-center"></i> à¸•à¸¹à¹‰à¸™à¹‰à¸³à¸”à¸·à¹ˆà¸¡à¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸</a></li>
                <li><a href="product_1.html" class="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50/50 hover:text-emerald-600 transition-colors"><i class="fa-solid fa-shirt text-indigo-500 w-5 text-center"></i> à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸‹à¸±à¸à¸œà¹‰à¸²à¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸</a></li>
                <li><a href="product_3.html" class="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50/50 hover:text-emerald-600 transition-colors"><i class="fa-solid fa-shop text-teal-500 w-5 text-center"></i> à¸£à¹‰à¸²à¸™à¸ªà¸°à¸”à¸§à¸à¸‹à¸±à¸</a></li>
                <li><a href="product_4.html" class="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50/50 hover:text-emerald-600 transition-colors"><i class="fa-solid fa-gas-pump text-rose-500 w-5 text-center"></i> à¸•à¸¹à¹‰à¸™à¹‰à¸³à¸¡à¸±à¸™à¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸</a></li>
                <li><a href="product_5.html" class="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50/50 hover:text-emerald-600 transition-colors"><i class="fa-solid fa-car text-sky-500 w-5 text-center"></i> à¸•à¸¹à¹‰à¸¥à¹‰à¸²à¸‡à¸£à¸–à¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸</a></li>
              </ul>
            </li>

            <!-- Submenu: à¸à¸²à¸£à¸£à¸±à¸šà¸›à¸£à¸°à¸à¸±à¸™ -->
            <li class="relative dropdown-hover">
              <button class="flex items-center gap-2 px-4 py-4 text-slate-700 hover:text-emerald-600 font-medium border-b-2 border-transparent hover:border-emerald-500 transition-all focus:outline-none">
                <i class="fa-solid fa-shield-halved text-teal-600"></i> à¸à¸²à¸£à¸£à¸±à¸šà¸›à¸£à¸°à¸à¸±à¸™ <i class="fa-solid fa-chevron-down text-[10px]"></i>
              </button>
              <ul class="dropdown-menu absolute hidden left-0 w-56 bg-white border border-slate-150 rounded-xl shadow-xl py-2 mt-0 text-slate-700 z-50">
                <li><a href="sbservice.html" class="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50/50 hover:text-emerald-600 transition-colors"><i class="fa-solid fa-city text-emerald-500 w-5 text-center"></i> à¸žà¸·à¹‰à¸™à¸—à¸µà¹ˆà¸à¸£à¸¸à¸‡à¹€à¸—à¸žà¸¯</a></li>
                <li><a href="sbservice1.html" class="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50/50 hover:text-emerald-600 transition-colors"><i class="fa-solid fa-map-location-dot text-indigo-500 w-5 text-center"></i> à¸žà¸·à¹‰à¸™à¸—à¸µà¹ˆà¸•à¹ˆà¸²à¸‡à¸ˆà¸±à¸‡à¸«à¸§à¸±à¸”</a></li>
              </ul>
            </li>

            <li>
              <a href="gallery.html" class="flex items-center gap-2 px-4 py-4 text-slate-700 hover:text-emerald-600 font-medium border-b-2 border-transparent hover:border-emerald-500 transition-all">
                <i class="fa-solid fa-images text-purple-500"></i> à¸œà¸¥à¸‡à¸²à¸™ / Gallery
              </a>
            </li>

            <!-- Submenu: à¸•à¸´à¸”à¸•à¹ˆà¸­à¹€à¸£à¸² -->
            <li class="relative dropdown-hover">
              <button class="flex items-center gap-2 px-4 py-4 text-slate-700 hover:text-emerald-600 font-medium border-b-2 border-transparent hover:border-emerald-500 transition-all focus:outline-none">
                <i class="fa-solid fa-envelope text-rose-500"></i> à¸•à¸´à¸”à¸•à¹ˆà¸­à¹€à¸£à¸² <i class="fa-solid fa-chevron-down text-[10px]"></i>
              </button>
              <ul class="dropdown-menu absolute hidden left-0 w-64 bg-white border border-slate-150 rounded-xl shadow-xl py-2 mt-0 text-slate-700 z-50">
                <li><a href="contact.html" class="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50/50 hover:text-emerald-600 transition-colors"><i class="fa-solid fa-building text-emerald-500 w-5 text-center"></i> à¸¨à¸¹à¸™à¸¢à¹Œà¸šà¸£à¸´à¸à¸²à¸£à¸à¸£à¸¸à¸‡à¹€à¸—à¸žà¸¯</a></li>
                <li><a href="contact3.html" class="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50/50 hover:text-emerald-600 transition-colors"><i class="fa-solid fa-map-location-dot text-indigo-500 w-5 text-center"></i> à¸¨à¸¹à¸™à¸¢à¹Œà¸šà¸£à¸´à¸à¸²à¸£à¸•à¹ˆà¸²à¸‡à¸ˆà¸±à¸‡à¸«à¸§à¸±à¸”</a></li>
              </ul>
            </li>
          </ul>

          <!-- Mobile Navigation Container with optimized icons -->
          <div id="mobile-menu" class="hidden lg:hidden py-4 border-t border-slate-100 flex flex-col gap-2">
            <a href="index.html" class="px-4 py-2 hover:bg-slate-50 text-slate-700 font-medium rounded-lg flex items-center gap-2">
              <i class="fa-solid fa-house text-emerald-500"></i> à¸«à¸™à¹‰à¸²à¸«à¸¥à¸±à¸
            </a>
            
            <div class="border-t border-slate-100 my-1"></div>
            
            <span class="px-4 py-1 text-xs font-bold uppercase text-slate-400 tracking-wider">à¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆà¸ªà¸´à¸™à¸„à¹‰à¸²à¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸</span>
            <a href="product_2.html" class="px-6 py-1.5 hover:bg-slate-50 text-slate-600 rounded-lg flex items-center gap-2"><i class="fa-solid fa-droplet text-blue-500 w-4 text-center"></i> à¸•à¸¹à¹‰à¸™à¹‰à¸³à¸”à¸·à¹ˆà¸¡à¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸</a>
            <a href="product_1.html" class="px-6 py-1.5 hover:bg-slate-50 text-slate-600 rounded-lg flex items-center gap-2"><i class="fa-solid fa-shirt text-indigo-500 w-4 text-center"></i> à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸‹à¸±à¸à¸œà¹‰à¸²à¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸</a>
            <a href="product_3.html" class="px-6 py-1.5 hover:bg-slate-50 text-slate-600 rounded-lg flex items-center gap-2"><i class="fa-solid fa-shop text-teal-500 w-4 text-center"></i> à¸£à¹‰à¸²à¸™à¸ªà¸°à¸”à¸§à¸à¸‹à¸±à¸</a>
            <a href="product_4.html" class="px-6 py-1.5 hover:bg-slate-50 text-slate-600 rounded-lg flex items-center gap-2"><i class="fa-solid fa-gas-pump text-rose-500 w-4 text-center"></i> à¸•à¸¹à¹‰à¸™à¹‰à¸³à¸¡à¸±à¸™à¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸</a>
            <a href="product_5.html" class="px-6 py-1.5 hover:bg-slate-50 text-slate-600 rounded-lg flex items-center gap-2"><i class="fa-solid fa-car text-sky-500 w-4 text-center"></i> à¸•à¸¹à¹‰à¸¥à¹‰à¸²à¸‡à¸£à¸–à¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸</a>

            <div class="border-t border-slate-100 my-1"></div>

            <span class="px-4 py-1 text-xs font-bold uppercase text-slate-400 tracking-wider">à¸šà¸£à¸´à¸à¸²à¸£à¹à¸¥à¸°à¸à¸²à¸£à¸£à¸±à¸šà¸›à¸£à¸°à¸à¸±à¸™</span>
            <a href="sbservice.html" class="px-6 py-1.5 hover:bg-slate-50 text-slate-600 rounded-lg flex items-center gap-2"><i class="fa-solid fa-city text-emerald-500 w-4 text-center"></i> à¸à¸£à¸¸à¸‡à¹€à¸—à¸žà¸¯</a>
            <a href="sbservice1.html" class="px-6 py-1.5 hover:bg-slate-50 text-slate-600 rounded-lg flex items-center gap-2"><i class="fa-solid fa-map-location-dot text-indigo-500 w-4 text-center"></i> à¸•à¹ˆà¸²à¸‡à¸ˆà¸±à¸‡à¸«à¸§à¸±à¸”</a>

            <div class="border-t border-slate-100 my-1"></div>

            <a href="gallery.html" class="px-4 py-2 hover:bg-slate-50 text-slate-700 font-medium rounded-lg flex items-center gap-2">
              <i class="fa-solid fa-images text-purple-500"></i> à¸œà¸¥à¸‡à¸²à¸™ / Gallery
            </a>
            
            <a href="contact3.html" class="px-4 py-2 hover:bg-slate-50 text-slate-700 font-medium rounded-lg flex items-center gap-2">
              <i class="fa-solid fa-envelope text-rose-500"></i> à¸Šà¹ˆà¸­à¸‡à¸—à¸²à¸‡à¸à¸²à¸£à¸•à¸´à¸”à¸•à¹ˆà¸­
            </a>
          </div>
        </div>
      </nav>
    `;
  }

  // ==========================================
  // 3. INJECT FOOTER
  // ==========================================
  const footerTarget = document.getElementById('shared-footer');
  if (footerTarget) {
    footerTarget.innerHTML = `
      <footer class="bg-gradient-to-b from-slate-900 to-slate-950 text-white pt-16 pb-8 border-t-4 border-emerald-500">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            <!-- Footer Section 1: Company Profile -->
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <img src="Images/logo_3d_transparent.png" class="h-10 w-auto object-contain" alt="S&B Footer Logo" onerror="this.onerror=null; this.src='Picture/logo_3d_transparent.png';">
                <h4 class="text-md font-bold uppercase tracking-wider text-teal-400">à¸šà¸£à¸´à¸©à¸±à¸— à¹€à¸­à¸ª à¹à¸­à¸™à¸”à¹Œ à¸šà¸µ</h4>
              </div>
              <h5 class="text-sm font-semibold text-slate-200">à¹€à¸­à¸ª à¹à¸­à¸™à¸”à¹Œ à¸šà¸µ à¸­à¸µà¹€à¸¥à¹‡à¸„à¹‚à¸—à¸£à¸™à¸´à¸„à¸ªà¹Œ à¹€à¸‹à¸­à¸£à¹Œà¸§à¸´à¸ª à¸ˆà¸³à¸à¸±à¸”</h5>
              <p class="text-xs text-slate-400 leading-relaxed">
                S &amp; B ELECTRONIC SERVICE COMPANY LIMITED <br><br>
                à¹€à¸¥à¸‚à¸—à¸µà¹ˆ 120/288 à¸«à¸¡à¸¹à¹ˆà¸—à¸µà¹ˆ 5 à¸•à¸³à¸šà¸¥à¸šà¸²à¸‡à¹€à¸”à¸·à¹ˆà¸­ à¸­à¸³à¹€à¸ à¸­à¹€à¸¡à¸·à¸­à¸‡à¸›à¸—à¸¸à¸¡ à¸ˆà¸±à¸‡à¸«à¸§à¸±à¸”à¸›à¸—à¸¸à¸¡à¸˜à¸²à¸™à¸µ 12000
              </p>
            </div>

            <!-- Footer Section 2: Contact Information -->
            <div class="space-y-4">
              <h4 class="text-md font-bold uppercase tracking-wider text-teal-400">à¸à¹ˆà¸²à¸¢à¸‚à¸²à¸¢à¹à¸¥à¸°à¸à¸²à¸£à¸•à¸´à¸”à¸•à¹ˆà¸­</h4>
              <ul class="space-y-2.5 text-xs text-slate-300">
                <li class="flex items-center gap-2 text-rose-400 font-bold">
                  <i class="fa-solid fa-phone text-sm"></i>
                  <span>à¸ªà¸²à¸¢à¸”à¹ˆà¸§à¸™: 084-912-5571</span>
                </li>
                <li class="flex items-center gap-2 text-slate-300">
                  <i class="fa-solid fa-phone-flip text-slate-400"></i>
                  <span>à¹€à¸šà¸­à¸£à¹Œà¸ªà¸³à¸™à¸±à¸à¸‡à¸²à¸™: 02-7313318</span>
                </li>
                <li class="flex items-center gap-2 hover:text-white transition-colors">
                  <i class="fa-solid fa-envelope text-slate-400"></i>
                  <a href="mailto:s_b_service@hotmail.com">s_b_service@hotmail.com</a>
                </li>
              </ul>
            </div>

            <!-- Footer Section 3: Social Links -->
            <div class="space-y-4">
              <h4 class="text-md font-bold uppercase tracking-wider text-teal-400">à¸•à¸´à¸”à¸•à¸²à¸¡à¹€à¸£à¸²</h4>
              <p class="text-xs text-slate-400 leading-relaxed">à¸•à¸´à¸”à¸•à¸²à¸¡à¸‚à¹ˆà¸²à¸§à¸ªà¸²à¸£ à¹‚à¸›à¸£à¹‚à¸¡à¸Šà¸±à¹ˆà¸™à¸ªà¸¸à¸”à¸žà¸´à¹€à¸¨à¸© à¹à¸¥à¸°à¸œà¸¥à¸‡à¸²à¸™à¸à¸²à¸£à¸•à¸´à¸”à¸•à¸±à¹‰à¸‡à¸•à¸¹à¹‰à¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸à¸¥à¹ˆà¸²à¸ªà¸¸à¸”</p>
              <div class="flex flex-col gap-2 pt-1 text-xs">
                <a href="http://www.facebook.com/SBService2012" target="_blank" class="flex items-center gap-2 text-slate-300 hover:text-teal-300 transition-colors">
                  <i class="fa-brands fa-square-facebook text-blue-500 text-lg"></i>
                  <span>ðŸ”— Facebook: S&B SERVICE</span>
                </a>
                <a href="https://line.me/R/ti/p/%40ioa4439m" target="_blank" class="flex items-center gap-2 text-slate-300 hover:text-teal-300 transition-colors">
                  <i class="fa-brands fa-line text-green-500 text-lg"></i>
                  <span>ðŸ“± Line Official: @sbservice</span>
                </a>
              </div>
            </div>

            <!-- Footer Section 4: Navigation Links -->
            <div class="space-y-4">
              <h4 class="text-md font-bold uppercase tracking-wider text-teal-400">à¹€à¸¡à¸™à¸¹à¸«à¸¥à¸±à¸</h4>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <a href="index.html" class="text-slate-300 hover:text-white hover:underline transition-all">à¸«à¸™à¹‰à¸²à¸«à¸¥à¸±à¸</a>
                <a href="gallery.html" class="text-slate-300 hover:text-white hover:underline transition-all">Gallery</a>
                <a href="contact.html" class="text-slate-300 hover:text-white hover:underline transition-all">à¸•à¸´à¸”à¸•à¹ˆà¸­à¹€à¸£à¸²</a>
                <a href="sbservice.html" class="text-slate-300 hover:text-white hover:underline transition-all">à¸šà¸£à¸´à¸à¸²à¸£à¸«à¸¥à¸±à¸‡à¸à¸²à¸£à¸‚à¸²à¸¢</a>
                <a href="product_1.html" class="text-slate-300 hover:text-white hover:underline transition-all">à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸‹à¸±à¸à¸œà¹‰à¸²à¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸</a>
                <a href="product_2.html" class="text-slate-300 hover:text-white hover:underline transition-all">à¸•à¸¹à¹‰à¸™à¹‰à¸³à¸”à¸·à¹ˆà¸¡à¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸</a>
              </div>
            </div>

          </div>

          <!-- Copyright and Legals -->
          <div class="border-t border-slate-800 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>&copy; 2026 à¸šà¸£à¸´à¸©à¸±à¸— à¹€à¸­à¸ª à¹à¸­à¸™à¸”à¹Œ à¸šà¸µ à¸­à¸µà¹€à¸¥à¹‡à¸„à¹‚à¸—à¸£à¸™à¸´à¸„à¸ªà¹Œ à¹€à¸‹à¸­à¸£à¹Œà¸§à¸´à¸ª à¸ˆà¸³à¸à¸±à¸” à¸ªà¸‡à¸§à¸™à¸¥à¸´à¸‚à¸ªà¸´à¸—à¸˜à¸´à¹Œà¸—à¸±à¹‰à¸‡à¸«à¸¡à¸”</p>
            <div class="flex gap-4">
              <span class="text-[10px] text-slate-500">Designed &amp; Maintained with Professional standard</span>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  // ==========================================
  // 4. INJECT REGIONAL BRANCH CONTENT
  // ==========================================
  const branchTarget = document.getElementById('shared-branch-content');
  if (branchTarget) {
    // 1. Gather attributes with robust defaults if undefined
    const province = branchTarget.getAttribute('data-province') || 'à¸­à¸¸à¸”à¸£à¸˜à¸²à¸™à¸µ';
    const locationInfo = branchTarget.getAttribute('data-location') || `à¹ƒà¸™à¸žà¸·à¹‰à¸™à¸—à¸µà¹ˆà¸ˆà¸±à¸‡à¸«à¸§à¸±à¸”${province}à¹à¸¥à¸°à¹ƒà¸à¸¥à¹‰à¹€à¸„à¸µà¸¢à¸‡`;
    const specificZone = branchTarget.getAttribute('data-specific-zone') || `à¸ªà¸³à¸«à¸£à¸±à¸šà¸¥à¸¹à¸à¸„à¹‰à¸²à¹ƒà¸™à¸•à¸±à¸§à¹€à¸¡à¸·à¸­à¸‡${province}`;

    // 2. Fallbacks for dynamic product images (Hero banners)
    const img1 = branchTarget.getAttribute('data-img-1') || 'Picture/product-hero1.png';
    const img2 = branchTarget.getAttribute('data-img-2') || 'Picture/product-hero2.png';
    const img3 = branchTarget.getAttribute('data-img-3') || 'Picture/product-hero3.png';
    const img4 = branchTarget.getAttribute('data-img-4') || 'Picture/product-hero4.png';
    const img5 = branchTarget.getAttribute('data-img-5') || 'Picture/product-hero5.png';

    // 3. Populate dynamic regional presentation grid and action cards
    branchTarget.innerHTML = `
      <section class="relative bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white py-16 px-4 overflow-hidden border-b border-teal-500/20">
        <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div class="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          <span class="inline-block bg-teal-500/10 text-teal-300 border border-teal-500/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
            Official Service Center
          </span>
          <h1 class="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            à¸¨à¸¹à¸™à¸¢à¹Œà¸šà¸£à¸´à¸à¸²à¸£ S&B Electronic Service <br class="hidden md:block">
            <span class="bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              à¸›à¸£à¸°à¸ˆà¸³à¸ˆà¸±à¸‡à¸«à¸§à¸±à¸”${province}
            </span>
          </h1>
          <p class="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-light">
            à¸¨à¸¹à¸™à¸¢à¹Œà¸£à¸§à¸¡à¹à¸¥à¸°à¸•à¸´à¸”à¸•à¸±à¹‰à¸‡à¸˜à¸¸à¸£à¸à¸´à¸ˆà¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸à¸„à¸£à¸šà¸§à¸‡à¸ˆà¸£ à¸£à¸²à¸„à¸²à¹€à¸”à¸µà¸¢à¸§à¸à¸±à¸™à¸—à¸±à¹ˆà¸§à¸›à¸£à¸°à¹€à¸—à¸¨ <br>
            <span class="text-white font-medium underline decoration-teal-400 underline-offset-4">${locationInfo}</span>
          </p>
        </div>
      </section>

    <section class="w-full bg-slate-900 py-8 px-4 sm:px-6 md:px-8">
  <div class="max-w-7xl mx-auto flex flex-col gap-10">
    
    <div class="w-full overflow-hidden group relative rounded-xl shadow-lg bg-slate-950">
      <a href="index.html" class="block w-full h-full">
        <img src="${img1}" alt="S&B Electronic Service ${province}" class="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.015]" onerror="this.onerror=null; this.src='Images/sb_service_updated.png';">
        <div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm tracking-wide z-10">
          à¸ à¸²à¸žà¸—à¸µà¹ˆ 1: S&B Electronic Service
        </div>
      </a>
    </div>

    <div class="w-full overflow-hidden group relative rounded-xl shadow-lg bg-slate-950">
      <a href="product_1.html" class="block w-full h-full">
        <img src="${img2}" alt="S&B Electronic Service ${province}" class="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.015]" onerror="this.onerror=null; this.src='Images/sb_service_updated1.jpg';">
        <div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm tracking-wide z-10">
          à¸ à¸²à¸žà¸—à¸µà¹ˆ 2: à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸‹à¸±à¸à¸œà¹‰à¸²à¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸à¸à¸²à¸šà¸™
        </div>
      </a>
    </div>

    <div class="w-full overflow-hidden group relative rounded-xl shadow-lg bg-slate-950">
      <a href="product_1.html" class="block w-full h-full">
        <img src="${img3}" alt="S&B Electronic Service ${province}" class="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.015]" onerror="this.onerror=null; this.src='Images/sb_service_updated2.jpg';">
        <div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm tracking-wide z-10">
          à¸ à¸²à¸žà¸—à¸µà¹ˆ 3: à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸‹à¸±à¸à¸œà¹‰à¸²à¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸à¸à¸²à¸«à¸™à¹‰à¸²
        </div>
      </a>
    </div>

    <div class="w-full overflow-hidden group relative rounded-xl shadow-lg bg-slate-950">
      <a href="product_1.html" class="block w-full h-full">
        <img src="${img4}" alt="S&B Electronic Service ${province}" class="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.015]" onerror="this.onerror=null; this.src='Images/sb_service_updated3.jpg';">
        <div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm tracking-wide z-10">
          à¸ à¸²à¸žà¸—à¸µà¹ˆ 4: à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸‹à¸±à¸à¸œà¹‰à¸²à¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸à¸à¸¶à¹ˆà¸‡à¸­à¸¸à¸•à¸ªà¸²à¸«à¸à¸£à¸£à¸¡
        </div>
      </a>
    </div>

    <div class="w-full overflow-hidden group relative rounded-xl shadow-lg bg-slate-950">
      <a href="product_1.html" class="block w-full h-full">
        <img src="${img5}" alt="S&B Electronic Service ${province}" class="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.015]" onerror="this.onerror=null; this.src='Images/sb_service_updated4.jpg';">
        <div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm tracking-wide z-10">
          à¸ à¸²à¸žà¸—à¸µà¹ˆ 5: à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸­à¸šà¸œà¹‰à¸²à¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸ WHIRLPOOL
        </div>
      </a>
    </div>

    <div class="w-full overflow-hidden group relative rounded-xl shadow-lg bg-slate-950">
      <a href="product_2.html" class="block w-full h-full">
        <img src="${img5}" alt="S&B Electronic Service ${province}" class="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.015]" onerror="this.onerror=null; this.src='Images/Ro3.jpg';">
        <div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm tracking-wide z-10">
          à¸ à¸²à¸žà¸—à¸µà¹ˆ 6: à¸•à¸¹à¹‰à¸™à¹‰à¸³à¸”à¸·à¹ˆà¸¡à¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸ à¸‚à¸™à¸²à¸”à¸–à¸±à¸‡à¹€à¸à¹‡à¸š 100 à¸¥à¸´à¸•à¸£
        </div>
      </a>
    </div>

    <div class="w-full overflow-hidden group relative rounded-xl shadow-lg bg-slate-950">
      <a href="product_2.html" class="block w-full h-full">
        <img src="${img5}" alt="S&B Electronic Service ${province}" class="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.015]" onerror="this.onerror=null; this.src='Images/sb_service_new_brochure.png';">
        <div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm tracking-wide z-10">
          à¸ à¸²à¸žà¸—à¸µà¹ˆ 6: à¸•à¸¹à¹‰à¸™à¹‰à¸³à¸”à¸·à¹ˆà¸¡à¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸ à¸‚à¸™à¸²à¸”à¸–à¸±à¸‡à¹€à¸à¹‡à¸š 200 à¸¥à¸´à¸•à¸£
        </div>
      </a>
    </div>

      <div class="w-full overflow-hidden group relative rounded-xl shadow-lg bg-slate-950">
      <a href="product_3.html" class="block w-full h-full">
        <img src="${img5}" alt="S&B Electronic Service ${province}" class="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.015]" onerror="this.onerror=null; this.src='Images/SSS.png';">
        <div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm tracking-wide z-10">
          à¸ à¸²à¸žà¸—à¸µà¹ˆ 7: à¸˜à¸¸à¸£à¸à¸´à¸ˆà¸£à¹‰à¸²à¸™à¸ªà¸°à¸”à¸§à¸à¸‹à¸±à¸
        </div>
      </a>
    </div>

      <div class="w-full overflow-hidden group relative rounded-xl shadow-lg bg-slate-950">
      <a href="product_4.html" class="block w-full h-full">
        <img src="${img5}" alt="S&B Electronic Service ${province}" class="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.015]" onerror="this.onerror=null; this.src='Images/oil.jpg';">
        <div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm tracking-wide z-10">
          à¸ à¸²à¸žà¸—à¸µà¹ˆ 8: à¸•à¸¹à¹‰à¸™à¹‰à¸³à¸¡à¸±à¸™à¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸
        </div>
      </a>
    </div>

        <div class="w-full overflow-hidden group relative rounded-xl shadow-lg bg-slate-950">
      <a href="product_5.html" class="block w-full h-full">
        <img src="${img5}" alt="S&B Electronic Service ${province}" class="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.015]" onerror="this.onerror=null; this.src='Images/sbservice_ad_1x1.png';">
        <div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm tracking-wide z-10">
          à¸ à¸²à¸žà¸—à¸µà¹ˆ 8: à¸•à¸¹à¹‰à¸¥à¹‰à¸²à¸‡à¸£à¸–à¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸
        </div>
      </a>
  </div>
</section>

      <section class="max-w-6xl mx-auto px-4 py-16">
        <div class="bg-gradient-to-br from-white to-slate-50 border border-slate-100 rounded-3xl shadow-xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-7 space-y-4">
            <h3 class="text-2xl md:text-3xl font-bold text-slate-900">
              à¸žà¸£à¹‰à¸­à¸¡à¹€à¸£à¸´à¹ˆà¸¡à¸˜à¸¸à¸£à¸à¸´à¸ˆà¸«à¸¢à¸­à¸”à¹€à¸«à¸£à¸µà¸¢à¸à¸—à¸µà¹ˆ <span class="text-emerald-600">${province}</span> à¸«à¸£à¸·à¸­à¸¢à¸±à¸‡?
            </h3>
            <p class="text-slate-600 leading-relaxed">
              à¸—à¸µà¸¡à¸‡à¸²à¸™à¸œà¸¹à¹‰à¹€à¸Šà¸µà¹ˆà¸¢à¸§à¸Šà¸²à¸à¸žà¸£à¹‰à¸­à¸¡à¸”à¸¹à¹à¸¥à¸„à¸¸à¸“à¹ƒà¸™à¸—à¸¸à¸à¸‚à¸±à¹‰à¸™à¸•à¸­à¸™ à¸•à¸±à¹‰à¸‡à¹à¸•à¹ˆà¹ƒà¸«à¹‰à¸„à¸³à¸›à¸£à¸¶à¸à¸©à¸²à¹€à¸¥à¸·à¸­à¸à¸—à¸³à¹€à¸¥ à¸ˆà¸±à¸”à¸ªà¹ˆà¸‡ à¸•à¸´à¸”à¸•à¸±à¹‰à¸‡à¸£à¸°à¸šà¸š à¹„à¸›à¸ˆà¸™à¸–à¸¶à¸‡à¸šà¸£à¸´à¸à¸²à¸£à¸”à¸¹à¹à¸¥à¸šà¸³à¸£à¸¸à¸‡à¸£à¸±à¸à¸©à¸²à¸•à¸¥à¸­à¸”à¸­à¸²à¸¢à¸¸à¸à¸²à¸£à¹ƒà¸Šà¹‰à¸‡à¸²à¸™ ${specificZone} à¸¡à¸±à¹ˆà¸™à¹ƒà¸ˆà¹„à¸”à¹‰à¹ƒà¸™à¸¡à¸²à¸•à¸£à¸à¸²à¸™à¸—à¸µà¹ˆà¹€à¸›à¹‡à¸™à¸«à¸™à¸¶à¹ˆà¸‡à¹€à¸”à¸µà¸¢à¸§à¸—à¸±à¹ˆà¸§à¸›à¸£à¸°à¹€à¸—à¸¨
            </p>
            <div class="inline-flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-100 px-4 py-2 rounded-xl font-medium">
              <i class="fa-solid fa-truck-fast"></i> à¸ªà¸´à¸—à¸˜à¸´à¸žà¸´à¹€à¸¨à¸©: à¸Ÿà¸£à¸µà¸„à¹ˆà¸²à¸ˆà¸±à¸”à¸ªà¹ˆà¸‡à¹à¸¥à¸°à¸•à¸´à¸”à¸•à¸±à¹‰à¸‡à¹ƒà¸™à¹€à¸‚à¸•à¸žà¸·à¹‰à¸™à¸—à¸µà¹ˆà¸”à¸¹à¹à¸¥à¸‚à¸­à¸‡à¸ªà¸²à¸‚à¸²
            </div>
          </div>
          <div class="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 justify-end w-full">
            <a href="tel:0849125571" class="hover-scale inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-emerald-600/20 text-center text-lg">
              <i class="fa-solid fa-phone-volume animate-bounce"></i> à¹‚à¸—à¸£à¸ªà¸²à¸¢à¸”à¹ˆà¸§à¸™: 084-912-5571
            </a>
            <a href="https://line.me/R/ti/p/%40ioa4439m" target="_blank" class="hover-scale inline-flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-green-600/20 text-center text-lg">
              <i class="fa-brands fa-line text-2xl"></i> à¸ªà¸­à¸šà¸–à¸²à¸¡à¸—à¸²à¸‡ Line Official
            </a>
          </div>
        </div>
      </section>
    `;
  }
});
