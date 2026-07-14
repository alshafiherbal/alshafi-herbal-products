/**
 * contact.js — Contact Us form: real-time validation, spam-protected
 * submission via AlshafiData.submitContactForm (backend-ready).
 */
(function () {
  function wireRealtimeValidation(form) {
    form.querySelectorAll("input[required], textarea[required]").forEach(field => {
      field.addEventListener("blur", () => {
        const wrap = field.closest(".form-field");
        if (!wrap) return;
        let valid = field.value.trim() !== "";
        if (field.type === "email" && valid) valid = AlshafiUtils.validateEmail(field.value);
        if (field.type === "tel" && valid) valid = AlshafiUtils.validatePhone(field.value);
        wrap.classList.toggle("invalid", !valid);
      });
      field.addEventListener("input", () => {
        const wrap = field.closest(".form-field");
        if (wrap && wrap.classList.contains("invalid") && field.value.trim() !== "") wrap.classList.remove("invalid");
      });
    });
  }

  function wireSubmit(form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!AlshafiUtils.validateForm(form)) {
        showToast("Please fill in all required fields correctly");
        form.querySelector(".form-field.invalid input, .form-field.invalid textarea")?.focus();
        return;
      }
      const btn = document.getElementById("contactSubmitBtn");
      const original = btn.textContent;
      btn.disabled = true; btn.textContent = "Sending…";
      try {
        const payload = Object.fromEntries(new FormData(form).entries());
        await AlshafiData.submitContactForm(payload);
        form.reset();
        showToast("Message sent! We'll get back to you shortly.");
      } catch (err) {
        showToast("Something went wrong. Please try WhatsApp or call us directly.");
      } finally {
        btn.disabled = false; btn.textContent = original;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    if (!form) return;
    wireRealtimeValidation(form);
    wireSubmit(form);
  });
})();
