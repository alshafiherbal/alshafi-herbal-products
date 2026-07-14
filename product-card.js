/**
 * product-card.js — renders a consistent product card across Home/Shop/
 * Categories/Product-detail(related) pages, and wires up its buttons.
 */
(function () {
  const I = window.AlshafiIcons;

  function starString(rating) {
    const full = Math.round(rating);
    return "★".repeat(full) + "☆".repeat(5 - full);
  }

  function badgeHTML(product) {
    let out = "";
    if (product.badges?.includes("new")) out += `<span class="badge badge-new">New</span>`;
    if (product.oldPrice) {
      const pct = Math.round((1 - product.price / product.oldPrice) * 100);
      out += `<span class="badge badge-sale">${pct}% Off</span>`;
    }
    if (product.badges?.includes("organic")) out += `<span class="badge badge-organic">100% Organic</span>`;
    if (product.stock > 0 && product.stock <= 15) out += `<span class="badge badge-sale" style="background:rgba(198,161,91,0.16); color:var(--color-gold-bright); border-color:rgba(198,161,91,0.35);">Only ${product.stock} Left</span>`;
    return out;
  }

  function productCardHTML(product) {
    const wished = AlshafiStore.isWishlisted(product.slug);
    const inStock = product.stock > 0;
    return `
      <article class="product-card reveal" data-id="${product.id}" data-slug="${product.slug}">
        <div class="product-media">
          <div class="product-badges">${badgeHTML(product)}</div>
          <button class="product-wishlist${wished ? " active" : ""}" aria-label="${wished ? "Remove " + product.name + " from wishlist" : "Add " + product.name + " to wishlist"}" aria-pressed="${wished}" data-slug="${product.slug}">${I.heart}</button>
          <a href="product.html?slug=${product.slug}" aria-label="View ${product.name}">
            <img class="lazy-img" src="${product.images[0]}" alt="${product.name} — ${product.categoryLabel}" loading="lazy" decoding="async" width="400" height="400">
          </a>
          ${!inStock ? `<div style="position:absolute; inset:0; background:rgba(10,13,10,0.6); display:flex; align-items:center; justify-content:center; z-index:2;"><span class="badge badge-sale">Out of Stock</span></div>` : ""}
        </div>
        <div class="product-body">
          <span class="product-cat">${product.categoryLabel}</span>
          <h3 class="product-title"><a href="product.html?slug=${product.slug}">${product.name}</a></h3>
          <div class="product-rating"><span class="stars" aria-hidden="true">${starString(product.rating)}</span><span class="visually-hidden">Rated ${product.rating} out of 5</span> (${product.reviewCount})</div>
          <div class="product-price">
            <span class="price-now" data-price="${product.price}">${AlshafiStore.formatPrice(product.price)}</span>
            ${product.oldPrice ? `<span class="price-old" data-price="${product.oldPrice}"><span class="visually-hidden">Original price:</span>${AlshafiStore.formatPrice(product.oldPrice)}</span>` : ""}
          </div>
          <div class="product-actions">
            <button class="btn btn-gold" data-add-cart="${product.id}" aria-label="Add ${product.name} to cart" ${!inStock ? "disabled" : ""}>${inStock ? "Add to Cart" : "Out of Stock"}</button>
            <a href="product.html?slug=${product.slug}" class="btn btn-outline">View</a>
          </div>
        </div>
      </article>
    `;
  }

  function wireProductCards(container, products) {
    container.querySelectorAll("[data-add-cart]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const product = products.find(p => p.id === btn.dataset.addCart);
        if (!product || product.stock <= 0) return;
        AlshafiStore.addToCart(product, 1);
        showToast(`${product.name} added to cart`);
      });
    });
    container.querySelectorAll(".product-wishlist").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const isNow = AlshafiStore.toggleWishlist(btn.dataset.slug);
        btn.classList.toggle("active", isNow);
        btn.setAttribute("aria-pressed", isNow);
        showToast(isNow ? "Added to wishlist" : "Removed from wishlist");
      });
    });
  }

  window.AlshafiProductCard = { productCardHTML, wireProductCards, starString };
})();
