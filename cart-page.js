/**
 * cart-page.js — full cart page: line items, quantity control, coupon
 * application, live summary totals.
 */
(function () {
  const I = window.AlshafiIcons;
  let appliedCoupon = null;

  function computeDiscount(subtotal) {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === "percent") return Math.round(subtotal * (appliedCoupon.value / 100));
    return Math.min(appliedCoupon.value, subtotal);
  }

  function renderCartPage() {
    const wrap = document.getElementById("cartPageItems");
    const cart = AlshafiStore.getCart();

    if (!cart.length) {
      wrap.innerHTML = `<div class="cart-empty glass" style="padding:4rem 2rem;">${I.cart}<p>Your cart is empty.</p><a href="shop.html" class="btn btn-gold mt-4">Start Shopping</a></div>`;
      document.getElementById("checkoutBtn").setAttribute("aria-disabled", "true");
      document.getElementById("checkoutBtn").style.pointerEvents = "none";
      document.getElementById("checkoutBtn").style.opacity = "0.5";
    } else {
      wrap.innerHTML = `<div class="glass" style="padding:var(--sp-6);">` + cart.map(item => `
        <div class="cart-line" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" loading="lazy" decoding="async" width="70" height="70">
          <div class="cart-line-info">
            <strong><a href="product.html?slug=${item.slug}">${item.name}</a></strong>
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
      `).join("") + `</div>`;

      wrap.querySelectorAll(".cart-line").forEach(line => {
        const id = line.dataset.id;
        line.querySelector('[data-action="inc"]').onclick = () => { const item = cart.find(i => i.id === id); AlshafiStore.updateQty(id, item.qty + 1); };
        line.querySelector('[data-action="dec"]').onclick = () => { const item = cart.find(i => i.id === id); AlshafiStore.updateQty(id, item.qty - 1); };
        line.querySelector('[data-action="remove"]').onclick = () => AlshafiStore.removeFromCart(id);
      });
    }

    const subtotal = AlshafiStore.cartSubtotal();
    const discount = computeDiscount(subtotal);
    document.getElementById("summarySubtotal").textContent = AlshafiStore.formatPrice(subtotal);
    document.getElementById("summaryDiscount").textContent = "− " + AlshafiStore.formatPrice(discount);
    document.getElementById("summaryTotal").textContent = AlshafiStore.formatPrice(subtotal - discount);
  }

  function wireCoupon() {
    document.getElementById("applyCouponBtn").addEventListener("click", async () => {
      const code = document.getElementById("couponInput").value.trim();
      const msgEl = document.getElementById("couponMessage");
      if (!code) return;
      const result = await AlshafiData.validateCoupon(code);
      if (result.valid) {
        appliedCoupon = result;
        msgEl.innerHTML = `<div class="coupon-applied"><span>✓ "${code.toUpperCase()}" applied — ${result.label}</span></div>`;
        showToast("Coupon applied successfully");
      } else {
        appliedCoupon = null;
        msgEl.innerHTML = `<p class="form-error" style="display:block;">Invalid or expired coupon code.</p>`;
      }
      renderCartPage();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderCartPage();
    wireCoupon();
    AlshafiStore.onChange("cart", renderCartPage);
  });
})();
