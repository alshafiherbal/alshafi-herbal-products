/**
 * blog.js — renders the blog post grid + wires the newsletter form on blog.html.
 */
(function () {
  async function renderBlogGrid() {
    const posts = await AlshafiData.getBlogPosts();
    document.getElementById("blogGrid").innerHTML = posts.map(p => `
      <article class="blog-card glass reveal">
        <a href="blog-post.html?slug=${p.slug}"><img class="lazy-img" src="${p.image}" alt="${p.title}" loading="lazy" decoding="async" width="400" height="250"></a>
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
    const form = document.getElementById("blogNewsletterForm");
    const emailField = document.getElementById("blogNewsletterEmail");
    emailField.addEventListener("blur", () => {
      const valid = emailField.value.trim() === "" || AlshafiUtils.validateEmail(emailField.value);
      emailField.setAttribute("aria-invalid", !valid);
    });
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = emailField.value.trim();
      if (!AlshafiUtils.validateEmail(email)) { showToast("Please enter a valid email address"); emailField.setAttribute("aria-invalid", "true"); emailField.focus(); return; }
      const btn = form.querySelector("button");
      const original = btn.textContent;
      btn.textContent = "Subscribing…"; btn.disabled = true;
      await AlshafiData.subscribeNewsletter(email);
      btn.textContent = original; btn.disabled = false;
      form.reset();
      emailField.removeAttribute("aria-invalid");
      showToast("Thanks for subscribing!");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderBlogGrid();
    wireNewsletter();
  });
})();
