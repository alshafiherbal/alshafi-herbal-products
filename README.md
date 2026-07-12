# Alshafi Herbal Products — Website

A premium, fully responsive, SEO-optimized eCommerce website for **Alshafi Herbal Products**, built with clean HTML, CSS, and vanilla JavaScript only — no frameworks, no build step. Free-hosting compatible (Cloudflare Pages, GitHub Pages, Netlify, Vercel static).

**Tagline:** Natural Healing, Trusted Quality

---

## 1. Folder Structure

```
alshafi/
├── index.html              Homepage
├── shop.html                Shop / product listing (search, filters, sort)
├── product.html              Product detail page (?slug=product-slug)
├── categories.html          All categories grid
├── cart.html                  Full cart page
├── checkout.html              Checkout / manual order form
├── about.html                About Us
├── contact.html              Contact Us (validated form)
├── blog.html                  Blog listing
├── blog-post.html            Single blog post (?slug=post-slug)
├── faq.html                   FAQ accordion
├── privacy.html               Privacy Policy
├── terms.html                 Terms & Conditions
├── robots.txt
├── sitemap.xml
├── css/
│   ├── variables.css         Design tokens (colors, type, spacing)
│   ├── base.css                Reset + global element styles
│   ├── layout.css              Header, nav, footer, floating buttons
│   ├── components.css         Product cards, forms, drawers, etc.
│   └── responsive.css         Breakpoint fine-tuning
├── js/
│   ├── data.js                  ★ Central data source (swap for real backend)
│   ├── store.js                 Cart / wishlist / theme / currency (localStorage)
│   ├── icons.js                 Inline SVG icon library
│   ├── ui.js                    Header/footer render + global interactions
│   ├── main.js                  Shared utilities (validation, formatting)
│   ├── product-card.js         Reusable product card renderer
│   ├── home.js, shop.js, product.js, cart-page.js, checkout.js, blog-post.js
├── images/                    Static image assets (add your own product photos)
├── icons/                      favicon.svg, apple-touch-icon.svg
└── assets/                    Reserved for future static assets
```

---

## 2. Running Locally

No build step is required. Any static file server works:

```bash
cd alshafi
python3 -m http.server 8080
# then open http://localhost:8080
```

Or use the VS Code "Live Server" extension.

---

## 3. Deploying for Free

### Cloudflare Pages
1. Push this folder to a GitHub repository.
2. In Cloudflare Pages, "Create a project" → connect the repo.
3. Build command: *(leave blank)* — Build output directory: `/` (project root).
4. Deploy.

### GitHub Pages
1. Push to a GitHub repo.
2. Repo Settings → Pages → Source: `main` branch, `/ (root)`.
3. Your site will be live at `https://<username>.github.io/<repo>/`.

> If deploying to a subpath (like GitHub Pages project sites), update the absolute links in `robots.txt`, `sitemap.xml`, and canonical/OG tags to match your final domain.

---

## 4. Editing Products, Categories, Blog & FAQs

All content lives in **`js/data.js`** inside plain JavaScript arrays:

- `ALSHAFI_PRODUCTS` — add/edit products (id, slug, name, price, images, etc.)
- `ALSHAFI_CATEGORIES` — category tiles
- `ALSHAFI_BLOG_POSTS` — blog articles (include a `content` array of paragraphs)
- `ALSHAFI_FAQS` — question/answer pairs
- `ALSHAFI_TESTIMONIALS` — customer reviews shown on the homepage slider
- `ALSHAFI_CURRENCY_RATES` — currency switcher rates (base: PKR)

Every page reads through the `AlshafiData` object — **never edit product data directly on individual HTML pages.**

To edit on mobile: open `js/data.js` in any code editor app (e.g. Working Copy + a text editor, or GitHub's in-browser editor), find the product/array you want, edit the JS object values, then save and push — no build step needed.

---

## 5. Connecting a Real Backend (Future-Ready)

`js/data.js` exposes a single interface, `AlshafiData`, with async methods:

```js
AlshafiData.getProducts(filters)
AlshafiData.getProductBySlug(slug)
AlshafiData.getCategories()
AlshafiData.getBlogPosts()
AlshafiData.submitOrder(payload)
AlshafiData.subscribeNewsletter(email)
AlshafiData.submitContactForm(payload)
AlshafiData.validateCoupon(code)
```

**No page-level code calls the raw data arrays** — every page calls `AlshafiData.*`. This means you can swap the internals of these methods to connect to a real backend without touching any HTML or other JS file:

| Backend         | What to change                                                              |
|------------------|-------------------------------------------------------------------------|
| **Firebase**     | Replace array reads with Firestore `getDocs(collection(db, 'products'))` calls; replace `submitOrder` with `addDoc()` |
| **Supabase**     | Replace with `supabase.from('products').select()` / `.insert()` calls |
| **WordPress**    | Point `getBlogPosts()` to `/wp-json/wp/v2/posts`                          |
| **WooCommerce**  | Point `getProducts()` to `/wp-json/wc/v3/products` (requires a small proxy for API keys) |
| **Shopify**      | Use the Storefront API (GraphQL) inside each method                       |
| **Custom API**   | Replace with `fetch('/api/...')` calls to your own REST endpoints          |

Each method already has a `// TODO(backend): ...` comment marking exactly where to make the change.

---

## 6. Cart, Wishlist & Checkout

- Cart and wishlist state is stored in `localStorage` via `js/store.js` (`AlshafiStore`), so it persists across page loads without a backend.
- Checkout (`checkout.html`) collects shipping info and submits via `AlshafiData.submitOrder()` — currently a mock that logs to console and returns an order ID. Replace with a real endpoint when ready.
- A "Order via WhatsApp" button is always available as a no-backend-required fallback — it builds a pre-filled WhatsApp message from the current cart.
- Cash on Delivery, Bank Transfer, and JazzCash/EasyPaisa are pre-wired as payment method options.

---

## 7. Coupon System

`AlshafiData.validateCoupon(code)` currently supports two demo codes:
- `WELCOME10` — 10% off
- `SAVE200` — flat Rs. 200 off

Add more codes directly in the `coupons` object inside `validateCoupon()`, or swap it for a real backend call.

---

## 8. SEO Checklist (already implemented)

- ✅ Unique meta titles & descriptions per page
- ✅ Open Graph + Twitter Card tags
- ✅ JSON-LD Schema: Organization, Product, Article, FAQPage, BreadcrumbList
- ✅ Clean semantic URLs (`?slug=` params for product/blog detail)
- ✅ `robots.txt` + `sitemap.xml`
- ✅ Lazy-loaded images (`loading="lazy"`) with `width`/`height` to prevent layout shift
- ✅ Descriptive `alt` text throughout
- ✅ Skip-to-content link + visible focus states for accessibility

**To finish before launch:** replace the Unsplash placeholder image URLs throughout `js/data.js` and the HTML files with your own optimized product photography (ideally WebP, served from `/images/`), and update `sitemap.xml`/canonical URLs if your final domain differs from `alshafiherbal.com`.

---

## 9. Performance Notes

- No external JS frameworks or icon fonts — all icons are inline SVG (`js/icons.js`).
- Fonts are loaded via `<link rel="preconnect">` + Google Fonts `display=swap`.
- Images use native lazy loading; swap in WebP + responsive `srcset` once you have final photography.
- CSS is split into small, cacheable files (`variables`, `base`, `layout`, `components`, `responsive`).

---

## 10. Brand Reference

- **Colors:** Deep black (`#0A0D0A`), aged gold (`#C6A15B` → `#E4C078`), apothecary green (`#0F3D24` → `#1E5C39`), cream (`#F4EFE4`)
- **Typography:** Cormorant Garamond (display/serif) + Manrope (body/sans)
- **Tone:** Trustworthy, heritage-rooted, premium — never overstates medical claims.

---

Built with care for a brand that deserves to compete internationally. 🌿
