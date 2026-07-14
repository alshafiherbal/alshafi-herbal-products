/**
 * home.js — populates dynamic sections of index.html
 */
(function () {
  const { productCardHTML, wireProductCards } = window.AlshafiProductCard;

  async function renderFeatured() {
    const grid = document.getElementById("featuredGrid");
    const products = await AlshafiData.getProducts({ featured: true });
    grid.innerHTML = products.slice(0, 8).map(productCardHTML).join("");
    wireProductCards(grid, products);
    document.dispatchEvent(new CustomEvent("alshafi:content-rendered"));
  }

  async function renderBestSellers() {
    const grid = document.getElementById("bestSellerGrid");
    const products = await AlshafiData.getProducts({ bestSeller: true });
    grid.innerHTML = products.map(productCardHTML).join("");
    wireProductCards(grid, products);
    document.dispatchEvent(new CustomEvent("alshafi:content-rendered"));
  }

  async function renderCategories() {
    const grid = document.getElementById("categoryGrid");
    const cats = await AlshafiData.getCategories();
    grid.innerHTML = cats.map(c => `
      <a href="shop.html?cat=${c.slug}" class="category-tile reveal">
        <img class="lazy-img" src="${c.image}" alt="${c.label} herbal products" loading="lazy" width="500" height="375">
        <div class="category-tile-content">
          <h3>${c.label}</h3>
          <span>Shop Now →</span>
        </div>
      </a>
    `).join("");
    document.dispatchEvent(new CustomEvent("alshafi:content-rendered"));
  }

  async function renderTestimonials() {
    const track = document.getElementById("testimonialTrack");
    const dots = document.getElementById("testimonialDots");
    const items = await AlshafiData.getTestimonials();
    track.innerHTML = items.map(t => `
      <div class="testimonial-slide">
        <div class="testimonial-card glass">
          <span class="stars">${window.AlshafiProductCard.starString(t.rating)}</span>
          <p class="testimonial-quote">"${t.quote}"</p>
          <div class="testimonial-person">
            <div>
              <strong>${t.name}</strong>
              <span>${t.location}</span>
            </div>
          </div>
        </div>
      </div>
    `).join("");
    dots.innerHTML = items.map((_, i) => `<button aria-label="Go to review ${i + 1}" data-i="${i}" class="${i === 0 ? "active" : ""}"></button>`).join("");

    let idx = 0;
    function goTo(i) {
      idx = (i + items.length) % items.length;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.querySelectorAll("button").forEach((b, bi) => b.classList.toggle("active", bi === idx));
    }
    dots.querySelectorAll("button").forEach(b => b.addEventListener("click", () => goTo(parseInt(b.dataset.i))));
    let auto = setInterval(() => goTo(idx + 1), 5500);
    track.closest(".testimonial-slider").addEventListener("mouseenter", () => clearInterval(auto));
    track.closest(".testimonial-slider").addEventListener("mouseleave", () => { auto = setInterval(() => goTo(idx + 1), 5500); });
  }

  async function renderBlogPreview() {
    const grid = document.getElementById("blogPreviewGrid");
    const posts = await AlshafiData.getBlogPosts();
    grid.innerHTML = posts.slice(0, 3).map(p => `
      <article class="blog-card glass reveal">
        <a href="blog-post.html?slug=${p.slug}"><img class="lazy-img" src="${p.image}" alt="${p.title}" loading="lazy" width="400" height="250"></a>
        <div class="blog-body">
          <div class="blog-meta"><span>${p.category}</span><span>${AlshafiUtils.formatDate(p.date)}</span></div>
          <h4><a href="blog-post.html?slug=${p.slug}">${p.title}</a></h4>
          <p>${p.excerpt}</p>
          <a class="blog-readmore" href="blog-post.html?slug=${p.slug}">Read More →</a>
        </div>
      </article>
    `).join("");
    document.dispatchEvent(new CustomEvent("alshafi:content-rendered"));
  }

  function wireNewsletter() {
    const form = document.getElementById("newsletterForm");
    const emailField = document.getElementById("newsletterEmail");
    emailField.addEventListener("blur", () => {
      const valid = emailField.value.trim() === "" || AlshafiUtils.validateEmail(emailField.value);
      emailField.setAttribute("aria-invalid", !valid);
    });
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = emailField.value.trim();
      if (!AlshafiUtils.validateEmail(email)) {
        showToast("Please enter a valid email address");
        emailField.setAttribute("aria-invalid", "true");
        emailField.focus();
        return;
      }
      const btn = form.querySelector("button");
      const original = btn.textContent;
      btn.textContent = "Subscribing…"; btn.disabled = true;
      await AlshafiData.subscribeNewsletter(email);
      btn.textContent = original; btn.disabled = false;
      form.reset();
      emailField.removeAttribute("aria-invalid");
      showToast("Thanks for subscribing to Alshafi Wellness Circle!");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderFeatured();
    renderBestSellers();
    renderCategories();
    renderTestimonials();
    renderBlogPreview();
    wireNewsletter();
  });
})();
