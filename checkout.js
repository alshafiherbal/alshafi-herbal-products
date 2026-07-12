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
    document.getElementById("whatsappOrderBtn").href = `https://wa.me/923001234567?text=${msg}`;
  }

  function wireForm() {
    const form = document.getElementById("checkoutForm");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!AlshafiUtils.validateForm(form)) { showToast("Please fill in all required fields correctly"); return; }
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
        document.getElementById("confirmOverlay").classList.add("open");
        document.getElementById("confirmModal").style.display = "block";
        AlshafiStore.clearCart();
        form.reset();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderSummary();
    wireForm();
    AlshafiStore.onChange("cart", renderSummary);
  });
})();
