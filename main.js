/**
 * main.js — small shared utilities used across page scripts.
 */
const AlshafiUtils = {
  qs(sel, ctx = document) { return ctx.querySelector(sel); },
  qsa(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; },

  getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  },

  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },
  validatePhone(phone) {
    return /^[0-9+\-\s()]{7,15}$/.test(phone);
  },

  /** Basic honeypot + required-field spam-protection validator for forms. */
  validateForm(form) {
    let valid = true;
    const honeypot = form.querySelector('input[name="website"]');
    if (honeypot && honeypot.value.trim() !== "") return false; // bot filled hidden field

    form.querySelectorAll("[required]").forEach(field => {
      const wrap = field.closest(".form-field") || field.parentElement;
      let fieldValid = field.value.trim() !== "";
      if (field.type === "email" && fieldValid) fieldValid = AlshafiUtils.validateEmail(field.value);
      if (field.type === "tel" && fieldValid) fieldValid = AlshafiUtils.validatePhone(field.value);
      wrap.classList.toggle("invalid", !fieldValid);
      if (!fieldValid) valid = false;
    });
    return valid;
  },

  debounce(fn, wait = 250) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
  },

  formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  },

  slugify(str) {
    return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  },
};
window.AlshafiUtils = AlshafiUtils;

// Re-render prices when currency changes (event dispatched from ui.js)
document.addEventListener("currencychange", () => {
  document.querySelectorAll("[data-price]").forEach(el => {
    const amount = parseFloat(el.dataset.price);
    el.textContent = AlshafiStore.formatPrice(amount);
  });
});
