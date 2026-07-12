/**
 * ui.js — global chrome (header/footer), interactions shared by every page.
 * Requires: icons.js, store.js, data.js loaded first.
 */
(function () {
  const I = window.AlshafiIcons;

  // ---------------------------------------------------------------------
  // Determine relative path prefix so header links work from any page depth
  // ---------------------------------------------------------------------
  const path = window.location.pathname;
  const currentPage = path.split("/").pop() || "index.html";

  function navItem(href, label, isActive) {
    return `<li><a href="${href}"${isActive ? ' class="active" aria-current="page"' : ""}>${label}</a></li>`;
  }

  function renderHeader() {
    const cartCount = AlshafiStore.cartCount();
    const wishCount = AlshafiStore.getWishlist().length;
    const theme = AlshafiStore.getTheme();

    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `
      <div class="header-top">
        <div class="container">
          <div class="header-top-links">
            <a href="tel:+923001234567">📞 +92 300 1234567</a>
            <a href="mailto:info@alshafiherbal.com">✉️ info@alshafiherbal.com</a>
          </div>
          <div class="header-top-tools">
            <span data-i18n="freeShip">Free delivery on orders over Rs. 3000</span>
          </div>
        </div>
      </div>
      <nav class="nav-main container" aria-label="Main navigation">
        <a href="index.html" class="logo" aria-label="Alshafi Herbal Products home">
          <span class="logo-mark">${I.leaf}</span>
          <span>
            Alshafi
            <span class="logo-tag">Herbal Products</span>
          </span>
        </a>

        <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="navLinks"><span></span></button>

        <ul class="nav-links" id="navLinks">
          ${navItem("index.html", "Home", currentPage === "index.html" || currentPage === "")}
          <li class="has-mega" id="shopMega">
            <a href="shop.html"${currentPage === "shop.html" ? ' class="active"' : ""}>Shop ${I.chevDown}</a>
            <div class="mega-menu" role="menu">
              <div class="mega-col">
                <h5>Categories</h5>
                <ul>
                  <li><a href="shop.html?cat=majoon">Majoon</a></li>
                  <li><a href="shop.html?cat=kushta">Kushta</a></li>
                  <li><a href="shop.html?cat=oils">Herbal Oils</a></li>
                  <li><a href="shop.html?cat=capsules">Herbal Capsules</a></li>
                </ul>
              </div>
              <div class="mega-col">
                <h5>More Categories</h5>
                <ul>
                  <li><a href="shop.html?cat=powder">Herbal Powder</a></li>
                  <li><a href="shop.html?cat=syrup">Herbal Syrup</a></li>
                  <li><a href="shop.html">All Products</a></li>
                  <li><a href="categories.html">Browse Categories</a></li>
                </ul>
              </div>
              <div class="mega-col">
                <h5>Collections</h5>
                <ul>
                  <li><a href="shop.html?filter=bestseller">Best Sellers</a></li>
                  <li><a href="shop.html?filter=new">New Arrivals</a></li>
                  <li><a href="shop.html?filter=sale">On Sale</a></li>
                </ul>
              </div>
              <a href="shop.html?filter=bestseller" class="mega-feature">
                <img src="https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=500&q=70" alt="Best selling herbal products" loading="lazy">
                <span>Shop Best Sellers →</span>
              </a>
            </div>
          </li>
          ${navItem("categories.html", "Categories", currentPage === "categories.html")}
          ${navItem("about.html", "About Us", currentPage === "about.html")}
          ${navItem("blog.html", "Blog", currentPage === "blog.html")}
          ${navItem("faq.html", "FAQ", currentPage === "faq.html")}
          ${navItem("contact.html", "Contact", currentPage === "contact.html")}
        </ul>
        <div class="nav-overlay" id="navOverlay"></div>

        <div class="nav-actions">
          <div class="toggle-group">
            <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark/light mode">${theme === "dark" ? I.moon : I.sun}</button>
            <button class="lang-toggle" id="langToggle" aria-label="Switch language">EN</button>
            <button class="currency-toggle" id="currencyToggle" aria-label="Switch currency">${AlshafiStore.getCurrency()}</button>
          </div>
          <div style="position:relative;">
            <button class="icon-btn" id="searchToggle" aria-label="Search products">${I.search}</button>
            <div class="search-panel glass" id="searchPanel">
              <form role="search" action="shop.html" method="get">
                <input type="search" name="q" placeholder="Search herbal products…" aria-label="Search products">
                <button class="btn btn-gold btn-sm" type="submit">Go</button>
              </form>
            </div>
          </div>
          <button class="icon-btn" id="wishlistToggle" aria-label="Open wishlist">${I.heart}<span class="icon-count" id="wishCount">${wishCount}</span></button>
          <button class="icon-btn" id="cartToggle" aria-label="Open cart">${I.cart}<span class="icon-count" id="cartCount">${cartCount}</span></button>
        </div>
      </nav>
    `;
    document.body.prepend(header);
  }

  function renderFooter() {
    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="container">
        <div class="trust-strip">
          <div class="trust-item">${I.shield} 100% Natural &amp; Lab-Verified</div>
          <div class="trust-item">${I.truck} Nationwide Cash on Delivery</div>
          <div class="trust-item">${I.award} Trusted Since 2010</div>
          <div class="trust-item">${I.leaf} Traditional Unani Formulations</div>
        </div>
      </div>
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="logo"><span class="logo-mark">${I.leaf}</span><span>Alshafi<span class="logo-tag">Herbal Products</span></span></a>
            <p>Natural Healing, Trusted Quality. Rooted in traditional Unani &amp; herbal wisdom, crafted for modern wellness.</p>
            <div class="social-row">
              <a href="https://facebook.com" class="social-icon" aria-label="Facebook" target="_blank" rel="noopener">${I.facebook}</a>
              <a href="https://instagram.com" class="social-icon" aria-label="Instagram" target="_blank" rel="noopener">${I.instagram}</a>
              <a href="https://twitter.com" class="social-icon" aria-label="Twitter" target="_blank" rel="noopener">${I.twitter}</a>
              <a href="https://youtube.com" class="social-icon" aria-label="YouTube" target="_blank" rel="noopener">${I.youtube}</a>
            </div>
          </div>
          <div class="footer-col">
            <h5>Shop</h5>
            <ul>
              <li><a href="shop.html">All Products</a></li>
              <li><a href="shop.html?filter=bestseller">Best Sellers</a></li>
              <li><a href="categories.html">Categories</a></li>
              <li><a href="cart.html">Your Cart</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="about.html">About Us</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="faq.html">FAQ</a></li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>Get In Touch</h5>
            <ul>
              <li>📍 123 Herbal Street, Islamabad, Pakistan</li>
              <li>📞 +92 300 1234567</li>
              <li>✉️ info@alshafiherbal.com</li>
              <li>🕒 Mon–Sat: 9am – 8pm</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© <span id="footerYear"></span> Alshafi Herbal Products. All rights reserved.</span>
          <div class="footer-legal">
            <a href="privacy.html">Privacy Policy</a>
            <a href="terms.html">Terms &amp; Conditions</a>
            <a href="faq.html">FAQ</a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(footer);
    document.getElementById("footerYear").textContent = new Date().getFullYear();
  }

  function renderFloatingActions() {
    const wrap = document.createElement("div");
    wrap.className = "floating-actions";
    wrap.innerHTML = `
      <button class="fab fab-top" id="scrollTopBtn" aria-label="Scroll to top">${I.arrowUp}</button>
      <a class="fab fab-call" href="tel:+923001234567" aria-label="Call us now">${I.phone}</a>
      <a class="fab fab-whatsapp" href="https://wa.me/923001234567?text=Assalamualaikum%2C%20I%27m%20interested%20in%20Alshafi%20Herbal%20Products" target="_blank" rel="noopener" aria-label="Order on WhatsApp">${I.whatsapp}</a>
    `;
    document.body.appendChild(wrap);

    const scrollBtn = document.getElementById("scrollTopBtn");
    window.addEventListener("scroll", () => {
      scrollBtn.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });
    scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  function renderDrawers() {
    const overlay = document.createElement("div");
    overlay.className = "drawer-overlay";
    overlay.id = "drawerOverlay";
    document.body.appendChild(overlay);

    const cartDrawer = document.createElement("aside");
    cartDrawer.className = "drawer";
    cartDrawer.id = "cartDrawer";
    cartDrawer.setAttribute("aria-label", "Shopping cart");
    cartDrawer.innerHTML = `
      <div class="drawer-head"><h4>Your Cart</h4><button class="icon-btn" id="closeCart" aria-label="Close cart">${I.close}</button></div>
      <div class="drawer-body" id="cartDrawerBody"></div>
      <div class="drawer-foot" id="cartDrawerFoot"></div>
    `;
    document.body.appendChild(cartDrawer);

    const wishDrawer = document.createElement("aside");
    wishDrawer.className = "drawer";
    wishDrawer.id = "wishDrawer";
    wishDrawer.setAttribute("aria-label", "Wishlist");
    wishDrawer.innerHTML = `
      <div class="drawer-head"><h4>Your Wishlist</h4><button class="icon-btn" id="closeWish" aria-label="Close wishlist">${I.close}</button></div>
      <div class="drawer-body" id="wishDrawerBody"></div>
    `;
    document.body.appendChild(wishDrawer);

    document.getElementById("closeCart").onclick = closeDrawers;
    document.getElementById("closeWish").onclick = closeDrawers;
    overlay.onclick = closeDrawers;
  }

  function openDrawer(which) {
    closeDrawers();
    document.getElementById("drawerOverlay").classList.add("open");
    document.getElementById(which).classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeDrawers() {
    document.getElementById("drawerOverlay")?.classList.remove("open");
    document.querySelectorAll(".drawer").forEach(d => d.classList.remove("open"));
    document.body.style.overflow = "";
  }

  function renderCartDrawer() {
    const body = document.getElementById("cartDrawerBody");
    const foot = document.getElementById("cartDrawerFoot");
    const cart = AlshafiStore.getCart();
    if (!cart.length) {
      body.innerHTML = `<div class="cart-empty">${I.cart}<p>Your cart is empty.</p><a href="shop.html" class="btn btn-outline btn-sm mt-4">Start Shopping</a></div>`;
      foot.innerHTML = "";
      return;
    }
    body.innerHTML = cart.map(item => `
      <div class="cart-line" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <div class="cart-line-info">
          <strong>${item.name}</strong>
          <span class="form-hint">${item.weight || ""}</span>
          <div class="qty-control">
            <button data-action="dec" aria-label="Decrease quantity">−</button>
            <span>${item.qty}</span>
            <button data-action="inc" aria-label="Increase quantity">+</button>
          </div>
          <button class="cart-line-remove" data-action="remove">Remove</button>
        </div>
        <div>${AlshafiStore.formatPrice(item.price * item.qty)}</div>
      </div>
    `).join("");
    foot.innerHTML = `
      <div class="cart-subtotal-row"><span>Subtotal</span><span>${AlshafiStore.formatPrice(AlshafiStore.cartSubtotal())}</span></div>
      <a href="checkout.html" class="btn btn-gold btn-block">Proceed to Checkout</a>
      <a href="cart.html" class="btn btn-outline btn-block mt-2">View Full Cart</a>
    `;
    body.querySelectorAll(".cart-line").forEach(line => {
      const id = line.dataset.id;
      line.querySelector('[data-action="inc"]').onclick = () => { const item = cart.find(i => i.id === id); AlshafiStore.updateQty(id, item.qty + 1); };
      line.querySelector('[data-action="dec"]').onclick = () => { const item = cart.find(i => i.id === id); AlshafiStore.updateQty(id, item.qty - 1); };
      line.querySelector('[data-action="remove"]').onclick = () => AlshafiStore.removeFromCart(id);
    });
  }

  async function renderWishDrawer() {
    const body = document.getElementById("wishDrawerBody");
    const slugs = AlshafiStore.getWishlist();
    if (!slugs.length) {
      body.innerHTML = `<div class="cart-empty">${I.heart}<p>Your wishlist is empty.</p><a href="shop.html" class="btn btn-outline btn-sm mt-4">Browse Products</a></div>`;
      return;
    }
    const all = await AlshafiData.getProducts();
    const items = all.filter(p => slugs.includes(p.slug));
    body.innerHTML = items.map(p => `
      <div class="cart-line">
        <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
        <div class="cart-line-info">
          <strong><a href="product.html?slug=${p.slug}">${p.name}</a></strong>
          <span class="form-hint">${AlshafiStore.formatPrice(p.price)}</span>
          <button class="cart-line-remove" data-slug="${p.slug}">Remove</button>
        </div>
      </div>
    `).join("");
    body.querySelectorAll("[data-slug]").forEach(btn => {
      btn.onclick = () => { AlshafiStore.toggleWishlist(btn.dataset.slug); renderWishDrawer(); };
    });
  }

  function updateBadges() {
    const cartEl = document.getElementById("cartCount");
    const wishEl = document.getElementById("wishCount");
    if (cartEl) cartEl.textContent = AlshafiStore.cartCount();
    if (wishEl) wishEl.textContent = AlshafiStore.getWishlist().length;
  }

  function wireHeaderEvents() {
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");
    const navOverlay = document.getElementById("navOverlay");
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navOverlay.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", open);
    });
    navOverlay.addEventListener("click", () => { navLinks.classList.remove("open"); navOverlay.classList.remove("open"); });

    // Mobile mega menu expand
    const shopMega = document.getElementById("shopMega");
    if (window.matchMedia("(max-width: 980px)").matches) {
      shopMega.querySelector("a").addEventListener("click", (e) => {
        if (window.innerWidth <= 980) { e.preventDefault(); shopMega.classList.toggle("open"); }
      });
    }

    // Search
    const searchToggle = document.getElementById("searchToggle");
    const searchPanel = document.getElementById("searchPanel");
    searchToggle.addEventListener("click", () => searchPanel.classList.toggle("open"));
    document.addEventListener("click", (e) => {
      if (!searchPanel.contains(e.target) && e.target !== searchToggle) searchPanel.classList.remove("open");
    });

    // Theme toggle
    document.getElementById("themeToggle").addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      AlshafiStore.setTheme(next);
      document.getElementById("themeToggle").innerHTML = next === "dark" ? I.moon : I.sun;
    });

    // Language toggle (demo: EN <-> UR labels; full i18n dictionary ready for expansion)
    document.getElementById("langToggle").addEventListener("click", () => {
      const current = AlshafiStore.getLang();
      const next = current === "en" ? "ur" : "en";
      AlshafiStore.setLang(next);
      document.getElementById("langToggle").textContent = next.toUpperCase();
      document.documentElement.setAttribute("lang", next === "ur" ? "ur" : "en");
      document.documentElement.setAttribute("dir", next === "ur" ? "rtl" : "ltr");
      showToast(next === "ur" ? "زبان اردو میں تبدیل ہو گئی" : "Language switched to English");
    });
    document.getElementById("langToggle").textContent = AlshafiStore.getLang().toUpperCase();

    // Currency toggle (cycles PKR -> USD -> AED -> SAR)
    const currencies = Object.keys(window.ALSHAFI_CURRENCY_RATES || { PKR: 1 });
    document.getElementById("currencyToggle").addEventListener("click", () => {
      const cur = AlshafiStore.getCurrency();
      const idx = currencies.indexOf(cur);
      const next = currencies[(idx + 1) % currencies.length];
      AlshafiStore.setCurrency(next);
      document.getElementById("currencyToggle").textContent = next;
      document.dispatchEvent(new CustomEvent("currencychange"));
      showToast(`Currency switched to ${next}`);
    });

    // Cart / wishlist drawers
    document.getElementById("cartToggle").addEventListener("click", () => { renderCartDrawer(); openDrawer("cartDrawer"); });
    document.getElementById("wishlistToggle").addEventListener("click", () => { renderWishDrawer(); openDrawer("wishDrawer"); });

    AlshafiStore.onChange("cart", () => { updateBadges(); renderCartDrawer(); });
    AlshafiStore.onChange("wishlist", () => { updateBadges(); renderWishDrawer(); });
  }

  // ---------------------------------------------------------------------
  // Toasts
  // ---------------------------------------------------------------------
  function ensureToastWrap() {
    let wrap = document.querySelector(".toast-wrap");
    if (!wrap) { wrap = document.createElement("div"); wrap.className = "toast-wrap"; document.body.appendChild(wrap); }
    return wrap;
  }
  function showToast(message) {
    const wrap = ensureToastWrap();
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `${I.check}<span>${message}</span>`;
    wrap.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));
    setTimeout(() => { toast.classList.remove("show"); setTimeout(() => toast.remove(), 350); }, 2800);
  }
  window.showToast = showToast;

  // ---------------------------------------------------------------------
  // Scroll reveal + lazy image loading (native loading="lazy" + fade-in)
  // ---------------------------------------------------------------------
  function initRevealObserver() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) { els.forEach(e => e.classList.add("in-view")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("in-view"); io.unobserve(entry.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
  }

  function initLazyImages() {
    document.querySelectorAll("img.lazy-img").forEach(img => {
      if (img.complete) img.classList.add("loaded");
      else img.addEventListener("load", () => img.classList.add("loaded"));
    });
  }

  // ---------------------------------------------------------------------
  // Loading screen
  // ---------------------------------------------------------------------
  function initLoadingScreen() {
    const screen = document.getElementById("loading-screen");
    if (!screen) return;
    window.addEventListener("load", () => {
      setTimeout(() => screen.classList.add("hide"), 300);
    });
  }

  // ---------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.setAttribute("data-theme", AlshafiStore.getTheme());
    renderHeader();
    renderFooter();
    renderFloatingActions();
    renderDrawers();
    wireHeaderEvents();
    updateBadges();
    initLoadingScreen();
    initRevealObserver();
    initLazyImages();
    // Re-run reveal observer after dynamic content injects (product grids etc.)
    document.addEventListener("alshafi:content-rendered", () => { initRevealObserver(); initLazyImages(); });
  });

  window.AlshafiUI = { showToast, openDrawer, closeDrawers, renderCartDrawer, renderWishDrawer };
})();
