/**
 * checkout.js — order summary rendering, manual order form submission
 * (COD-ready, backend-ready via AlshafiData.submitOrder), WhatsApp fallback.
 */
(function () {
  const SHIPPING_FLAT = 200;

  function renderSummary() {
    const cart = AlshafiStore.getCart();
    const list = document.getElementById("checkoutItemsList");
    list.innerHTML = cart.map(item => `
      <div class="order-summary-line"><span>${item.name} × ${item.qty}</span><span>${AlshafiStore.formatPrice(item.price * item.qty)}</span></div>
    `).join("") || `<p class="form-hint">Your cart is empty. <a href="shop.html">Browse products</a>.</p>`;

    const subtotal = AlshafiStore.cartSubtotal();
    const shipping = cart.length ? SHIPPING_FLAT : 0;
    document.getElementById("coSubtotal").textContent = AlshafiStore.formatPrice(subtotal);
    document.getElementById("coShipping").textContent = AlshafiStore.formatPrice(shipping);
    document.getElementById("coTotal").textContent = AlshafiStore.formatPrice(subtotal + shipping);

    // Build WhatsApp order message
    const lines = cart.map(i => `- ${i.name} x${i.qty} (${AlshafiStore.formatPrice(i.price * i.qty)})`).join("%0A");
    const msg = `Assalamualaikum, I'd like to place an order:%0A${lines}%0A%0ATotal: ${encodeURIComponent(AlshafiStore.formatPrice(subtotal + shipping))}`;
    document.getElementById("whatsappOrderBtn").href = `https://wa.me/923193830108?text=${msg}`;
  }

  function wireForm() {
    const form = document.getElementById("checkoutForm");

    // Real-time validation: clear/set error state as the person leaves each field
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

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!AlshafiUtils.validateForm(form)) {
        showToast("Please fill in all required fields correctly");
        form.querySelector(".form-field.invalid input, .form-field.invalid textarea")?.focus();
        return;
      }
      if (!AlshafiStore.getCart().length) { showToast("Your cart is empty"); return; }

      const btn = document.getElementById("placeOrderBtn");
      btn.disabled = true; btn.textContent = "Placing Order…";

      const formData = new FormData(form);
      const payload = {
        customer: {
          name: formData.get("fullName"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          address: formData.get("address"),
          city: formData.get("city"),
          postalCode: formData.get("postalCode"),
          notes: formData.get("orderNotes"),
        },
        paymentMethod: formData.get("payment"),
        items: AlshafiStore.getCart(),
        subtotal: AlshafiStore.cartSubtotal(),
        shipping: SHIPPING_FLAT,
      };

      const result = await AlshafiData.submitOrder(payload);
      btn.disabled = false; btn.textContent = "Place Order";

      if (result.success) {
        document.getElementById("orderIdDisplay").textContent = result.orderId;
        openConfirmModal();
        AlshafiStore.clearCart();
        form.reset();
      } else {
        showToast("Something went wrong placing your order. Please try again or order via WhatsApp.");
      }
    });
  }

  function openConfirmModal() {
    const overlay = document.getElementById("confirmOverlay");
    const modal = document.getElementById("confirmModal");
    overlay.classList.add("open");
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    document.getElementById("confirmBackHome").focus();
  }
  function closeConfirmModal() {
    document.getElementById("confirmOverlay").classList.remove("open");
    document.getElementById("confirmModal").style.display = "none";
    document.body.style.overflow = "";
  }

  function wireModalDismiss() {
    document.getElementById("confirmOverlay").addEventListener("click", closeConfirmModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.getElementById("confirmModal").style.display === "block") closeConfirmModal();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderSummary();
    wireForm();
    wireModalDismiss();
    AlshafiStore.onChange("cart", renderSummary);
  });
})();
