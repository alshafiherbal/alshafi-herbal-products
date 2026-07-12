/**
 * shop.js — drives the Shop page: category filter, chip filters, sort,
 * search, price range. Reads initial state from URL query params so
 * category mega-menu / best-seller links work.
 */
(function () {
  const { productCardHTML, wireProductCards } = window.AlshafiProductCard;
  const grid = document.getElementById("shopGrid");
  const noResults = document.getElementById("noResults");
  const resultCount = document.getElementById("resultCount");

  let state = {
    category: AlshafiUtils.getParam("cat") || "",
    search: AlshafiUtils.getParam("q") || "",
    chip: AlshafiUtils.getParam("filter") || "all",
    sort: "default",
    maxPrice: 5000,
  };

  async function renderCategoryFilters() {
    const cats = await AlshafiData.getCategories();
    const list = document.getElementById("categoryFilterList");
    list.innerHTML = `<label><input type="radio" name="catFilter" value="" ${!state.category ? "checked" : ""}> All Categories</label>` +
      cats.map(c => `<label><input type="radio" name="catFilter" value="${c.slug}" ${state.category === c.slug ? "checked" : ""}> ${c.label}</label>`).join("");
    list.querySelectorAll('input[name="catFilter"]').forEach(input => {
      input.addEventListener("change", () => { state.category = input.value; renderProducts(); });
    });
  }

  async function renderProducts() {
    let filters = { category: state.category || undefined, search: state.search || undefined, sort: state.sort !== "default" ? state.sort : undefined, maxPrice: state.maxPrice };
    if (state.chip === "bestseller") filters.bestSeller = true;

    let products = await AlshafiData.getProducts(filters);
    if (state.chip === "new") products = products.filter(p => p.badges?.includes("new"));
    if (state.chip === "sale") products = products.filter(p => p.oldPrice);

    resultCount.textContent = `${products.length} product${products.length !== 1 ? "s" : ""} found`;

    if (!products.length) {
      grid.innerHTML = ""; noResults.style.display = "block";
      return;
    }
    noResults.style.display = "none";
    grid.innerHTML = products.map(productCardHTML).join("");
    wireProductCards(grid, products);
    document.dispatchEvent(new CustomEvent("alshafi:content-rendered"));
  }

  function wireControls() {
    document.getElementById("chipFilters").addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      state.chip = btn.dataset.filter;
      renderProducts();
    });

    document.getElementById("sortSelect").addEventListener("change", (e) => { state.sort = e.target.value; renderProducts(); });

    const searchInput = document.getElementById("shopSearch");
    searchInput.value = state.search;
    searchInput.addEventListener("input", AlshafiUtils.debounce(() => { state.search = searchInput.value; renderProducts(); }, 300));

    const priceRange = document.getElementById("priceRange");
    const priceLabel = document.getElementById("priceLabel");
    priceRange.addEventListener("input", () => {
      state.maxPrice = parseInt(priceRange.value);
      priceLabel.textContent = AlshafiStore.formatPrice(state.maxPrice);
      renderProductsDebounced();
    });
    const renderProductsDebounced = AlshafiUtils.debounce(renderProducts, 250);

    // Pre-set chip active state from URL
    if (state.chip !== "all") {
      document.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c.dataset.filter === state.chip));
    }
  }

  document.addEventListener("DOMContentLoaded", async () => {
    await renderCategoryFilters();
    wireControls();
    renderProducts();
  });
})();
