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
    if (product.oldPrice) out += `<span class="badge badge-sale">Sale</span>`;
    if (product.badges?.includes("organic")) out += `<span class="badge badge-organic">100% Organic</span>`;
    return out;
  }

  function productCardHTML(product) {
    const wished = AlshafiStore.isWishlisted(product.slug);
    return `
      <article class="product-card reveal" data-id="${product.id}" data-slug="${product.slug}">
        <div class="product-media">
          <div class="product-badges">${badgeHTML(product)}</div>
          <button class="product-wishlist${wished ? " active" : ""}" aria-label="Add to wishlist" data-slug="${product.slug}">${I.heart}</button>
          <a href="product.html?slug=${product.slug}">
            <img class="lazy-img" src="${product.images[0]}" alt="${product.name} — ${product.categoryLabel}" loading="lazy" width="400" height="400">
          </a>
        </div>
        <div class="product-body">
          <span class="product-cat">${product.categoryLabel}</span>
          <h3 class="product-title"><a href="product.html?slug=${product.slug}">${product.name}</a></h3>
          <div class="product-rating"><span class="stars">${starString(product.rating)}</span> (${product.reviewCount})</div>
          <div class="product-price">
            <span class="price-now" data-price="${product.price}">${AlshafiStore.formatPrice(product.price)}</span>
            ${product.oldPrice ? `<span class="price-old" data-price="${product.oldPrice}">${AlshafiStore.formatPrice(product.oldPrice)}</span>` : ""}
          </div>
          <div class="product-actions">
            <button class="btn btn-gold" data-add-cart="${product.id}">Add to Cart</button>
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
        if (!product) return;
        AlshafiStore.addToCart(product, 1);
        showToast(`${product.name} added to cart`);
      });
    });
    container.querySelectorAll(".product-wishlist").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const isNow = AlshafiStore.toggleWishlist(btn.dataset.slug);
        btn.classList.toggle("active", isNow);
        showToast(isNow ? "Added to wishlist" : "Removed from wishlist");
      });
    });
  }

  window.AlshafiProductCard = { productCardHTML, wireProductCards, starString };
})();
