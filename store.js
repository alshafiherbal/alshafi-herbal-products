/**
 * store.js
 * ---------------------------------------------------------------------------
 * Client-side state: Cart, Wishlist, Recently Viewed, Theme, Language,
 * Currency. Persists to localStorage so it survives page navigation on a
 * static multi-page site. Swap `persist()`/`load()` internals for a backend
 * (Firebase/Supabase user carts) later without changing calling code.
 * ---------------------------------------------------------------------------
 */

const AlshafiStore = (() => {
  const KEYS = {
    cart: "alshafi_cart",
    wishlist: "alshafi_wishlist",
    recent: "alshafi_recent",
    theme: "alshafi_theme",
    lang: "alshafi_lang",
    currency: "alshafi_currency",
  };

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
  }

  let cart = load(KEYS.cart, []); // [{id, slug, name, price, image, qty, weight}]
  let wishlist = load(KEYS.wishlist, []); // [slug,...]
  let recent = load(KEYS.recent, []); // [slug,...]

  const listeners = { cart: [], wishlist: [] };
  function emit(type) { listeners[type].forEach(fn => fn()); }

  return {
    onChange(type, fn) { listeners[type]?.push(fn); },

    // ---- Cart ----
    getCart() { return cart; },
    cartCount() { return cart.reduce((sum, i) => sum + i.qty, 0); },
    cartSubtotal() { return cart.reduce((sum, i) => sum + i.qty * i.price, 0); },
    addToCart(product, qty = 1) {
      const existing = cart.find(i => i.id === product.id);
      if (existing) { existing.qty += qty; }
      else { cart.push({ id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.images[0], qty, weight: product.weight }); }
      save(KEYS.cart, cart);
      emit("cart");
    },
    updateQty(id, qty) {
      const item = cart.find(i => i.id === id);
      if (item) { item.qty = Math.max(1, qty); save(KEYS.cart, cart); emit("cart"); }
    },
    removeFromCart(id) {
      cart = cart.filter(i => i.id !== id);
      save(KEYS.cart, cart);
      emit("cart");
    },
    clearCart() { cart = []; save(KEYS.cart, cart); emit("cart"); },

    // ---- Wishlist ----
    getWishlist() { return wishlist; },
    isWishlisted(slug) { return wishlist.includes(slug); },
    toggleWishlist(slug) {
      if (wishlist.includes(slug)) wishlist = wishlist.filter(s => s !== slug);
      else wishlist.push(slug);
      save(KEYS.wishlist, wishlist);
      emit("wishlist");
      return wishlist.includes(slug);
    },

    // ---- Recently viewed ----
    getRecent() { return recent; },
    addRecent(slug) {
      recent = [slug, ...recent.filter(s => s !== slug)].slice(0, 8);
      save(KEYS.recent, recent);
    },

    // ---- Theme ----
    getTheme() { return load(KEYS.theme, "dark"); },
    setTheme(t) { save(KEYS.theme, t); },

    // ---- Language ----
    getLang() { return load(KEYS.lang, "en"); },
    setLang(l) { save(KEYS.lang, l); },

    // ---- Currency ----
    getCurrency() { return load(KEYS.currency, "PKR"); },
    setCurrency(c) { save(KEYS.currency, c); },

    formatPrice(amountPKR) {
      const cur = this.getCurrency();
      const rates = window.ALSHAFI_CURRENCY_RATES || { PKR: { symbol: "Rs.", rate: 1 } };
      const info = rates[cur] || rates.PKR;
      const value = amountPKR * info.rate;
      const formatted = cur === "PKR" ? Math.round(value).toLocaleString() : value.toFixed(2);
      return `${info.symbol} ${formatted}`;
    },
  };
})();

window.AlshafiStore = AlshafiStore;
