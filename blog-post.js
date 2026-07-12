/**
 * blog-post.js — populates blog-post.html based on ?slug= query param.
 */
(function () {
  function renderPost(post) {
    document.title = `${post.title} | Alshafi Herbal Products`;
    document.getElementById("pageTitle").textContent = `${post.title} | Alshafi Herbal Products`;
    document.getElementById("pageDesc").setAttribute("content", post.excerpt);
    document.getElementById("canonicalLink").setAttribute("href", `https://www.alshafiherbal.com/blog-post.html?slug=${post.slug}`);
    document.getElementById("ogTitle").setAttribute("content", post.title);
    document.getElementById("ogDesc").setAttribute("content", post.excerpt);
    document.getElementById("ogImage").setAttribute("content", post.image);
    document.getElementById("breadcrumb").innerHTML = `<a href="index.html">Home</a><span>/</span><a href="blog.html">Blog</a><span>/</span><span>${post.title}</span>`;

    document.getElementById("articleSchema").textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      image: [post.image],
      datePublished: post.date,
      author: { "@type": "Person", name: post.author },
      publisher: { "@type": "Organization", name: "Alshafi Herbal Products" },
      description: post.excerpt,
    });

    document.getElementById("postHeader").innerHTML = `
      <span class="eyebrow">${post.category}</span>
      <h1>${post.title}</h1>
      <div class="blog-meta mt-4" style="font-size:var(--fs-sm);">
        <span>By ${post.author}</span><span>${AlshafiUtils.formatDate(post.date)}</span>
      </div>
    `;
    const img = document.getElementById("postImage");
    img.src = post.image; img.alt = post.title;

    document.getElementById("postContent").innerHTML = post.content.map(p => `<p class="mb-4">${p}</p>`).join("");
  }

  async function renderMoreArticles(currentSlug) {
    const posts = await AlshafiData.getBlogPosts();
    const others = posts.filter(p => p.slug !== currentSlug).slice(0, 3);
    document.getElementById("moreArticlesGrid").innerHTML = others.map(p => `
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

  document.addEventListener("DOMContentLoaded", async () => {
    const slug = AlshafiUtils.getParam("slug");
    const post = slug ? await AlshafiData.getBlogPostBySlug(slug) : null;
    if (!post) {
      document.querySelector("article .container").innerHTML = `<div class="text-center" style="padding:4rem 0;"><h2>Article Not Found</h2><a href="blog.html" class="btn btn-gold mt-6">Back to Blog</a></div>`;
      return;
    }
    renderPost(post);
    renderMoreArticles(post.slug);
  });
})();
