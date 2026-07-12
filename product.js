/**
 * product.js — populates product.html based on ?slug= query param.
 */
(function () {
  const I = window.AlshafiIcons;
  const { productCardHTML, wireProductCards, starString } = window.AlshafiProductCard;

  function reviewsMock(product) {
    const names = ["Fatima A.", "Ali H.", "Zainab S.", "Usman T.", "Mariam K."];
    return Array.from({ length: Math.min(4, Math.ceil(product.reviewCount / 40)) }).map((_, i) => ({
      name: names[i % names.length],
      rating: Math.max(3, Math.round(product.rating) - (i % 2)),
      date: new Date(Date.now() - i * 12 * 24 * 60 * 60 * 1000).toISOString(),
      text: [
        "Genuinely impressed with the quality and how quickly it arrived. Will order again.",
        "Packaging feels premium and the product works well as part of my routine.",
        "Good value, noticeable difference within a few weeks of consistent use.",
        "Customer service on WhatsApp was very responsive when I had questions.",
      ][i % 4],
    }));
  }

  function renderDetail(product) {
    document.title = `${product.name} | Alshafi Herbal Products`;
    document.getElementById("pageTitle").textContent = `${product.name} | Alshafi Herbal Products`;
    document.getElementById("pageDesc").setAttribute("content", product.shortDesc);
    document.getElementById("canonicalLink").setAttribute("href", `https://www.alshafiherbal.com/product.html?slug=${product.slug}`);
    document.getElementById("ogTitle").setAttribute("content", product.name);
    document.getElementById("ogDesc").setAttribute("content", product.shortDesc);
    document.getElementById("ogImage").setAttribute("content", product.images[0]);
    document.getElementById("breadcrumb").innerHTML = `<a href="index.html">Home</a><span>/</span><a href="shop.html">Shop</a><span>/</span><span>${product.name}</span>`;

    document.getElementById("productSchema").textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: product.images,
      description: product.shortDesc,
      sku: product.id,
      brand: { "@type": "Brand", name: "Alshafi Herbal Products" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount },
      offers: { "@type": "Offer", priceCurrency: "PKR", price: product.price, availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" }
    });

    const wished = AlshafiStore.isWishlisted(product.slug);
    const grid = document.getElementById("productDetailGrid");
    grid.innerHTML = `
      <div class="pd-gallery reveal in-view">
        <div class="pd-gallery-main glass"><img id="pdMainImg" src="${product.images[0]}" alt="${product.name}" width="600" height="600"></div>
        ${product.images.length > 1 ? `<div class="pd-thumbs">${product.images.map((img, i) => `<img src="${img}" alt="${product.name} view ${i + 1}" class="${i === 0 ? "active" : ""}" data-src="${img}">`).join("")}</div>` : ""}
      </div>
      <div class="pd-info reveal in-view">
        <span class="product-cat">${product.categoryLabel}</span>
        <h1 class="pd-title">${product.name}</h1>
        <div class="pd-meta-row">
          <div class="product-rating"><span class="stars">${starString(product.rating)}</span> ${product.rating} (${product.reviewCount} reviews)</div>
          ${product.stock > 0 ? `<span class="badge badge-new">In Stock</span>` : `<span class="badge badge-sale">Out of Stock</span>`}
        </div>
        <div class="pd-price-row">
          <span class="price-now" data-price="${product.price}">${AlshafiStore.formatPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="price-old" data-price="${product.oldPrice}">${AlshafiStore.formatPrice(product.oldPrice)}</span><span class="badge badge-sale">Save ${Math.round((1 - product.price / product.oldPrice) * 100)}%</span>` : ""}
        </div>
        <p class="pd-desc">${product.shortDesc} <span style="color:var(--text-muted); font-size:var(--fs-sm);">(${product.weight})</span></p>

        <div class="pd-qty-cart">
          <div class="qty-box">
            <button id="qtyMinus" aria-label="Decrease quantity">−</button>
            <input type="text" id="qtyInput" value="1" readonly aria-label="Quantity">
            <button id="qtyPlus" aria-label="Increase quantity">+</button>
          </div>
          <button class="btn btn-gold" id="addCartBtn" ${product.stock <= 0 ? "disabled" : ""}>${I.cart} Add to Cart</button>
          <button class="icon-btn" id="pdWishlistBtn" style="border:1px solid rgba(198,161,91,0.25);" aria-label="Toggle wishlist">${I.heart}</button>
        </div>
        <div class="pd-cta-row">
          <a href="https://wa.me/923001234567?text=${encodeURIComponent("Assalamualaikum, I'd like to order: " + product.name)}" target="_blank" rel="noopener" class="btn btn-green">${I.whatsapp} Order on WhatsApp</a>
          <a href="checkout.html?buynow=${product.slug}" class="btn btn-outline">Buy Now</a>
        </div>

        <div class="pd-trust-row">
          <div class="trust-item">${I.shield} 100% Natural</div>
          <div class="trust-item">${I.truck} Cash on Delivery</div>
          <div class="trust-item">${I.award} Quality Assured</div>
        </div>
      </div>
    `;

    // Gallery thumb switching
    document.querySelectorAll(".pd-thumbs img").forEach(thumb => {
      thumb.addEventListener("click", () => {
        document.getElementById("pdMainImg").src = thumb.dataset.src;
        document.querySelectorAll(".pd-thumbs img").forEach(t => t.classList.remove("active"));
        thumb.classList.add("active");
      });
    });

    // Qty controls
    const qtyInput = document.getElementById("qtyInput");
    document.getElementById("qtyMinus").addEventListener("click", () => { qtyInput.value = Math.max(1, parseInt(qtyInput.value) - 1); });
    document.getElementById("qtyPlus").addEventListener("click", () => { qtyInput.value = parseInt(qtyInput.value) + 1; });

    document.getElementById("addCartBtn").addEventListener("click", () => {
      AlshafiStore.addToCart(product, parseInt(qtyInput.value));
      showToast(`${product.name} added to cart`);
    });

    const wishBtn = document.getElementById("pdWishlistBtn");
    if (wished) wishBtn.classList.add("active");
    wishBtn.style.color = wished ? "var(--color-gold-bright)" : "";
    wishBtn.addEventListener("click", () => {
      const isNow = AlshafiStore.toggleWishlist(product.slug);
      wishBtn.style.color = isNow ? "var(--color-gold-bright)" : "";
      showToast(isNow ? "Added to wishlist" : "Removed from wishlist");
    });

    // Tabs
    document.getElementById("tab-description").innerHTML = `<p>${product.description}</p>`;
    document.getElementById("tab-ingredients").innerHTML = `
      <h4 class="mb-2">Key Ingredients</h4>
      <p class="mb-4">${product.ingredients.join(", ")}.</p>
      <h4 class="mb-2">Usage Instructions</h4>
      <p>${product.usage}</p>
    `;
    const reviews = reviewsMock(product);
    document.getElementById("tab-reviews").innerHTML = reviews.map(r => `
      <div class="review-item">
        <div class="review-head"><strong>${r.name}</strong><span class="review-date">${AlshafiUtils.formatDate(r.date)}</span></div>
        <span class="stars">${starString(r.rating)}</span>
        <p style="margin-top:0.5rem;">${r.text}</p>
      </div>
    `).join("");

    document.querySelectorAll(".pd-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".pd-tab-btn").forEach(b => { b.classList.remove("active"); b.setAttribute("aria-selected", "false"); });
        document.querySelectorAll(".pd-tab-panel").forEach(p => p.classList.remove("active"));
        btn.classList.add("active"); btn.setAttribute("aria-selected", "true");
        document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
      });
    });

    AlshafiStore.addRecent(product.slug);
  }

  async function renderRelated(product) {
    const related = await AlshafiData.getRelated(product);
    const grid = document.getElementById("relatedGrid");
    if (!related.length) { document.getElementById("relatedGrid").closest("section").style.display = "none"; return; }
    grid.innerHTML = related.map(productCardHTML).join("");
    wireProductCards(grid, related);
    document.dispatchEvent(new CustomEvent("alshafi:content-rendered"));
  }

  async function renderRecentlyViewed(currentSlug) {
    const recentSlugs = AlshafiStore.getRecent().filter(s => s !== currentSlug);
    if (!recentSlugs.length) return;
    const all = await AlshafiData.getProducts();
    const items = recentSlugs.map(s => all.find(p => p.slug === s)).filter(Boolean);
    if (!items.length) return;
    document.getElementById("recentlyViewedSection").style.display = "block";
    const grid = document.getElementById("recentGrid");
    grid.innerHTML = items.map(productCardHTML).join("");
    wireProductCards(grid, items);
    document.dispatchEvent(new CustomEvent("alshafi:content-rendered"));
  }

  document.addEventListener("DOMContentLoaded", async () => {
    const slug = AlshafiUtils.getParam("slug");
    const product = slug ? await AlshafiData.getProductBySlug(slug) : null;
    if (!product) {
      document.getElementById("productDetailGrid").innerHTML = `<div class="text-center" style="grid-column:1/-1; padding:4rem 0;"><h2>Product Not Found</h2><p class="mt-4">The product you're looking for doesn't exist or may have been removed.</p><a href="shop.html" class="btn btn-gold mt-6">Browse All Products</a></div>`;
      return;
    }
    renderDetail(product);
    renderRelated(product);
    renderRecentlyViewed(product.slug);
  });
})();
