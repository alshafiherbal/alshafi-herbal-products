/**
 * categories.js — renders the full category grid on categories.html.
 */
(function () {
  document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("allCategoriesGrid");
    const cats = await AlshafiData.getCategories();
    grid.innerHTML = cats.map(c => `
      <a href="shop.html?cat=${c.slug}" class="category-tile reveal" aria-label="Shop ${c.label}">
        <img class="lazy-img" src="${c.image}" alt="${c.label} herbal products" loading="lazy" decoding="async" width="500" height="375">
        <div class="category-tile-content">
          <h3>${c.label}</h3>
          <p style="color:var(--text-secondary); font-size:var(--fs-sm); margin:0.4rem 0;">${c.desc}</p>
          <span>Shop Now →</span>
        </div>
      </a>
    `).join("");
    document.dispatchEvent(new CustomEvent("alshafi:content-rendered"));
  });
})();
