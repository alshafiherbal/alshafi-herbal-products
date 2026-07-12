/**
 * data.js
 * ---------------------------------------------------------------------------
 * Central product/content data source for Alshafi Herbal Products.
 *
 * FUTURE BACKEND INTEGRATION:
 * This file exposes a single async API object `AlshafiData` with methods
 * like getProducts(), getProductBySlug(), getCategories(), etc.
 * Right now these read from the static ALSHAFI_PRODUCTS array below.
 *
 * To connect a real backend later, you only need to rewrite the function
 * BODIES inside AlshafiData — every page calls AlshafiData.*, never the
 * raw array directly. Examples:
 *
 *   Firebase:   replace getProducts() with a Firestore collection().get()
 *   Supabase:   replace getProducts() with supabase.from('products').select()
 *   WooCommerce:replace getProducts() with fetch('/wp-json/wc/v3/products')
 *   Custom API: replace getProducts() with fetch('/api/products')
 *
 * No other file needs to change. Currency + language dictionaries are also
 * defined here for the multi-language / currency switcher.
 * ---------------------------------------------------------------------------
 */

const ALSHAFI_PRODUCTS = [
  {
    id: "p001",
    slug: "majoon-mughlai-strength",
    name: "Majoon Mughlai Strength",
    category: "majoon",
    categoryLabel: "Majoon",
    price: 2499,
    oldPrice: 2999,
    currency: "PKR",
    rating: 4.8,
    reviewCount: 132,
    badges: ["organic"],
    images: [
      "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&q=80",
      "https://images.unsplash.com/photo-1611071536241-b1c88d0b9166?w=800&q=80"
    ],
    shortDesc: "A traditional Unani herbal jam blended with 21 root herbs to restore vitality and stamina.",
    description: "Majoon Mughlai Strength is prepared using a centuries-old Unani formulation, slow-cooked with pure desi ghee, almonds, and 21 hand-selected root herbs. Traditionally used to support energy, stamina, and general wellbeing when taken as part of a balanced daily routine.",
    ingredients: ["Salab Misri", "Kaunch Beej", "Asgandh Nagori", "Pure Desi Ghee", "Almonds", "Honey"],
    usage: "Take 1 tablespoon (10g) daily with warm milk, preferably in the morning on an empty stomach.",
    weight: "250g Jar",
    stock: 24,
    bestSeller: true,
    featured: true,
  },
  {
    id: "p002",
    slug: "kushta-jawahar-mohra",
    name: "Kushta Jawahar Mohra",
    category: "kushta",
    categoryLabel: "Kushta",
    price: 3299,
    oldPrice: null,
    currency: "PKR",
    rating: 4.9,
    reviewCount: 87,
    badges: ["new"],
    images: [
      "https://images.unsplash.com/photo-1615486363973-e797e0a41d09?w=800&q=80",
      "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=800&q=80"
    ],
    shortDesc: "Classic calcined mineral-herbal compound prepared using traditional Kushta-making methods.",
    description: "Kushta Jawahar Mohra is prepared through a traditional calcination process passed down through generations of hakeems. It is formulated to support heart and nerve health as part of a holistic wellness routine.",
    ingredients: ["Jawahar Mohra Base", "Purified Minerals", "Herbal Extracts"],
    usage: "Take as directed by a qualified hakeem or herbal practitioner, typically 125mg-250mg with honey.",
    weight: "10g Tin",
    stock: 15,
    bestSeller: true,
    featured: true,
  },
  {
    id: "p003",
    slug: "sandal-herbal-massage-oil",
    name: "Sandal Herbal Massage Oil",
    category: "oils",
    categoryLabel: "Herbal Oils",
    price: 1299,
    oldPrice: 1599,
    currency: "PKR",
    rating: 4.7,
    reviewCount: 204,
    badges: ["organic", "new"],
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80",
      "https://images.unsplash.com/photo-1595425964272-3a3d21f8b0e6?w=800&q=80"
    ],
    shortDesc: "Cold-pressed sandalwood and almond oil blend for scalp, skin, and joint massage.",
    description: "Our Sandal Herbal Massage Oil combines cold-pressed sandalwood, sweet almond, and 6 supporting herbs into a lightweight, fast-absorbing formula for daily massage — soothing to skin and scalp alike.",
    ingredients: ["Sandalwood Oil", "Sweet Almond Oil", "Sesame Oil", "Brahmi Extract", "Vitamin E"],
    usage: "Massage gently onto skin or scalp 2-3 times weekly. For external use only.",
    weight: "100ml Bottle",
    stock: 42,
    bestSeller: true,
    featured: true,
  },
  {
    id: "p004",
    slug: "herbal-joint-relief-capsules",
    name: "Herbal Joint Relief Capsules",
    category: "capsules",
    categoryLabel: "Herbal Capsules",
    price: 1899,
    oldPrice: 2199,
    currency: "PKR",
    rating: 4.6,
    reviewCount: 156,
    badges: ["organic"],
    images: [
      "https://images.unsplash.com/photo-1550572017-edd951b55104?w=800&q=80",
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&q=80"
    ],
    shortDesc: "Plant-based capsules combining turmeric, boswellia, and ginger for joint comfort.",
    description: "Formulated with standardized turmeric curcumin, boswellia serrata, and ginger root, these vegetarian capsules support joint comfort and mobility as part of an active lifestyle.",
    ingredients: ["Turmeric Extract", "Boswellia Serrata", "Ginger Root", "Black Pepper Extract"],
    usage: "Take 1 capsule twice daily after meals with water, or as directed by your healthcare provider.",
    weight: "60 Capsules",
    stock: 60,
    bestSeller: false,
    featured: true,
  },
  {
    id: "p005",
    slug: "himalayan-shilajit-powder",
    name: "Himalayan Shilajit Powder",
    category: "powder",
    categoryLabel: "Herbal Powder",
    price: 2199,
    oldPrice: null,
    currency: "PKR",
    rating: 4.9,
    reviewCount: 98,
    badges: ["organic"],
    images: [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80",
      "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=800&q=80"
    ],
    shortDesc: "Purified high-altitude Shilajit resin powder, rich in fulvic acid and trace minerals.",
    description: "Sourced from high-altitude Himalayan rock formations and purified using traditional methods, our Shilajit powder is a mineral-rich resin known in Ayurvedic and Unani tradition for supporting energy and vitality.",
    ingredients: ["100% Purified Shilajit Resin"],
    usage: "Dissolve a pea-sized amount (300-500mg) in warm water or milk once daily.",
    weight: "50g Jar",
    stock: 33,
    bestSeller: true,
    featured: true,
  },
  {
    id: "p006",
    slug: "sehat-herbal-tonic-syrup",
    name: "Sehat Herbal Tonic Syrup",
    category: "syrup",
    categoryLabel: "Herbal Syrup",
    price: 999,
    oldPrice: 1199,
    currency: "PKR",
    rating: 4.5,
    reviewCount: 176,
    badges: [],
    images: [
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80",
      "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=800&q=80"
    ],
    shortDesc: "A family-favourite daily tonic syrup made with 12 immunity-supporting herbs.",
    description: "Sehat Herbal Tonic Syrup blends amla, mulethi, giloy, and 9 additional herbs into a naturally sweetened daily tonic suitable for the whole family, supporting digestion and daily immunity.",
    ingredients: ["Amla", "Mulethi (Licorice)", "Giloy", "Honey Base", "Herbal Extract Blend"],
    usage: "Adults: 15ml twice daily. Children above 6 years: 5ml twice daily. Shake well before use.",
    weight: "200ml Bottle",
    stock: 50,
    bestSeller: false,
    featured: true,
  },
  {
    id: "p007",
    slug: "majoon-falasfa",
    name: "Majoon Falasfa",
    category: "majoon",
    categoryLabel: "Majoon",
    price: 1799,
    oldPrice: null,
    currency: "PKR",
    rating: 4.4,
    reviewCount: 61,
    badges: [],
    images: ["https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80"],
    shortDesc: "A digestive-support Majoon blend rooted in classical Unani texts.",
    description: "A traditional preparation used to support healthy digestion, formulated according to classical Unani texts using a warming blend of spices and herbs.",
    ingredients: ["Sonth", "Kali Mirch", "Pipal", "Honey", "Ghee Base"],
    usage: "1 teaspoon after meals, twice daily.",
    weight: "200g Jar",
    stock: 20,
    bestSeller: false,
    featured: false,
  },
  {
    id: "p008",
    slug: "kalonji-black-seed-oil",
    name: "Kalonji Black Seed Oil",
    category: "oils",
    categoryLabel: "Herbal Oils",
    price: 899,
    oldPrice: 1099,
    currency: "PKR",
    rating: 4.8,
    reviewCount: 310,
    badges: ["organic"],
    images: ["https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80"],
    shortDesc: "100% cold-pressed Kalonji (Nigella Sativa) oil, unrefined and unfiltered.",
    description: "Cold-pressed from premium black seeds, our Kalonji oil is unrefined and unfiltered to preserve its natural potency — a staple of traditional herbal wellness routines.",
    ingredients: ["100% Nigella Sativa Seed Oil"],
    usage: "Take 1 teaspoon daily, or use topically as directed.",
    weight: "120ml Bottle",
    stock: 70,
    bestSeller: true,
    featured: false,
  },
  {
    id: "p009",
    slug: "womens-wellness-capsules",
    name: "Women's Wellness Capsules",
    category: "capsules",
    categoryLabel: "Herbal Capsules",
    price: 2099,
    oldPrice: null,
    currency: "PKR",
    rating: 4.7,
    reviewCount: 74,
    badges: ["new"],
    images: ["https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=800&q=80"],
    shortDesc: "Herbal blend of shatavari and ashwagandha to support women's daily wellness.",
    description: "A carefully balanced formula combining shatavari, ashwagandha, and shatpushpa to support women's hormonal balance and daily wellness routines.",
    ingredients: ["Shatavari", "Ashwagandha", "Shatpushpa", "Vegetable Cellulose Capsule"],
    usage: "1 capsule twice daily with meals, or as directed by your healthcare provider.",
    weight: "60 Capsules",
    stock: 40,
    bestSeller: false,
    featured: false,
  },
  {
    id: "p010",
    slug: "multani-herbal-glow-powder",
    name: "Multani Herbal Glow Powder",
    category: "powder",
    categoryLabel: "Herbal Powder",
    price: 699,
    oldPrice: 899,
    currency: "PKR",
    rating: 4.6,
    reviewCount: 143,
    badges: ["organic"],
    images: ["https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80"],
    shortDesc: "A blend of multani mitti, sandalwood, and rose for a natural skin glow ritual.",
    description: "Our signature face pack powder blends multani mitti, sandalwood, and rose petal powder — a gentle traditional skincare ritual for a naturally radiant look.",
    ingredients: ["Multani Mitti", "Sandalwood Powder", "Rose Petal Powder", "Neem Powder"],
    usage: "Mix 2 tsp with rose water to a paste, apply to face, leave 15 minutes, rinse.",
    weight: "150g Pouch",
    stock: 55,
    bestSeller: false,
    featured: false,
  },
  {
    id: "p011",
    slug: "liver-care-herbal-syrup",
    name: "Liver Care Herbal Syrup",
    category: "syrup",
    categoryLabel: "Herbal Syrup",
    price: 1099,
    oldPrice: null,
    currency: "PKR",
    rating: 4.5,
    reviewCount: 89,
    badges: [],
    images: ["https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=800&q=80"],
    shortDesc: "Kasni and Makoy based tonic traditionally used to support liver wellness.",
    description: "Formulated with kasni, makoy, and kalmegh — herbs traditionally used to support healthy liver function as part of a balanced diet.",
    ingredients: ["Kasni", "Makoy", "Kalmegh", "Honey Base"],
    usage: "15ml twice daily before meals. Shake well before use.",
    weight: "200ml Bottle",
    stock: 38,
    bestSeller: false,
    featured: false,
  },
  {
    id: "p012",
    slug: "kushta-qalai-mutlaq",
    name: "Kushta Qalai Mutlaq",
    category: "kushta",
    categoryLabel: "Kushta",
    price: 2799,
    oldPrice: 3099,
    currency: "PKR",
    rating: 4.6,
    reviewCount: 52,
    badges: ["sale"],
    images: ["https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=800&q=80"],
    shortDesc: "Traditional Kushta preparation used in classical Unani wellness routines.",
    description: "Prepared through classical calcination methods by our in-house hakeems, following recipes preserved for generations.",
    ingredients: ["Qalai Base", "Herbal Extracts", "Purified Minerals"],
    usage: "As directed by a qualified herbal practitioner.",
    weight: "10g Tin",
    stock: 12,
    bestSeller: false,
    featured: false,
  },
];

const ALSHAFI_CATEGORIES = [
  { slug: "majoon", label: "Majoon", labelUr: "معجون", icon: "leaf", image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&q=80", desc: "Traditional herbal jams for vitality & stamina." },
  { slug: "kushta", label: "Kushta", labelUr: "کشتہ", icon: "gem", image: "https://images.unsplash.com/photo-1615486363973-e797e0a41d09?w=600&q=80", desc: "Classical calcined mineral-herbal compounds." },
  { slug: "oils", label: "Herbal Oils", labelUr: "عطریات", icon: "droplet", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80", desc: "Cold-pressed oils for skin, hair & massage." },
  { slug: "capsules", label: "Herbal Capsules", labelUr: "کیپسول", icon: "capsule", image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=600&q=80", desc: "Convenient plant-based daily wellness capsules." },
  { slug: "powder", label: "Herbal Powder", labelUr: "سفوف", icon: "mortar", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80", desc: "Pure ground herbal powders & resins." },
  { slug: "syrup", label: "Herbal Syrup", labelUr: "شربت", icon: "flask", image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80", desc: "Family tonic syrups for daily wellbeing." },
];

const ALSHAFI_BLOG_POSTS = [
  {
    slug: "benefits-of-shilajit-in-unani-medicine",
    title: "The Role of Shilajit in Traditional Unani Medicine",
    excerpt: "Explore how this Himalayan resin has been used for centuries to support energy and vitality in classical herbal practice.",
    image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=700&q=80",
    date: "2026-06-02",
    author: "Hakeem Abdul Sami",
    category: "Herbal Education",
    content: [
      "Shilajit is a mineral-rich resin that seeps from rock formations high in the Himalayas, formed gradually over centuries as plant matter decomposes under pressure. In classical Unani and Ayurvedic practice, it has long held a place among the most valued natural substances for supporting daily vitality.",
      "Traditionally, Shilajit is purified through repeated dissolving, filtering, and drying before it is considered ready for use. This process removes impurities from the raw resin while concentrating the fulvic acid and trace minerals it's known for.",
      "In a daily wellness routine, a small pea-sized amount is typically dissolved in warm milk or water. Many practitioners recommend consistency over large doses, taking a small amount daily rather than occasional large servings.",
      "As with any herbal supplement, quality and sourcing matter greatly. Look for resin that has been purified through a transparent process, and always consult a qualified healthcare provider before adding it to your routine, especially if you are managing an existing health condition.",
    ],
  },
  {
    slug: "understanding-majoon-formulations",
    title: "Understanding Majoon: The Art of Herbal Jam-Making",
    excerpt: "A look into how traditional Majoon preparations are crafted, and what makes each formulation unique.",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=700&q=80",
    date: "2026-05-18",
    author: "Alshafi Editorial Team",
    category: "Herbal Education",
    content: [
      "Majoon, meaning 'kneaded' in Persian, refers to a category of thick, jam-like herbal preparations central to Unani medicine. Unlike simple powders or tinctures, a Majoon can combine a dozen or more herbs, minerals, and a sweetening base like honey or ghee into a single, slow-cooked formulation.",
      "The preparation process itself is a craft passed down through generations of hakeems. Herbs are typically ground to a fine consistency, then simmered gradually with a ghee or honey base at low heat, allowing the active properties of each herb to fully integrate into the final mixture.",
      "Different Majoon formulations are traditionally associated with different areas of wellness — some geared toward stamina and vitality, others toward digestion or general daily nourishment. The specific blend of herbs determines the intended use.",
      "Because Majoon preparations are concentrated and often rich in natural sugars from honey, they are typically taken in small daily doses — often a single tablespoon — rather than as a food in larger quantities.",
    ],
  },
  {
    slug: "daily-wellness-routine-with-herbal-oils",
    title: "Building a Daily Wellness Routine with Herbal Oils",
    excerpt: "Simple, practical ways to incorporate cold-pressed herbal oils into your everyday self-care ritual.",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=700&q=80",
    date: "2026-04-27",
    author: "Alshafi Editorial Team",
    category: "Self Care",
    content: [
      "Herbal oils have played a role in daily self-care rituals across South Asian and Middle Eastern traditions for centuries, valued for their use in massage, scalp care, and skin nourishment.",
      "A simple way to begin incorporating herbal oils into your routine is a short scalp massage two to three times a week. Warming the oil slightly before application can help it absorb more easily and make the ritual more relaxing.",
      "For skin, a light application after bathing — while the skin is still slightly damp — can help the oil absorb without feeling greasy. Cold-pressed oils like sandalwood or sweet almond are generally gentle enough for regular use.",
      "As with any topical product, it's wise to do a small patch test before regular use, particularly if you have sensitive skin, and to discontinue use if any irritation occurs.",
    ],
  },
];

const ALSHAFI_TESTIMONIALS = [
  { name: "Ayesha R.", location: "Lahore, Pakistan", rating: 5, quote: "The Sandal Herbal Oil has become part of my nightly routine. The quality feels genuinely premium, and it arrived beautifully packaged." },
  { name: "Muhammad Bilal", location: "Karachi, Pakistan", rating: 5, quote: "I've tried many local herbal brands, but Alshafi's Majoon tastes and feels authentic, just like what my grandfather used to get from his hakeem." },
  { name: "Sana K.", location: "Islamabad, Pakistan", rating: 4, quote: "Fast delivery and great customer service on WhatsApp. The joint relief capsules have been a nice addition to my routine." },
  { name: "Hassan M.", location: "Faisalabad, Pakistan", rating: 5, quote: "Shilajit powder is pure and well packaged. You can tell the brand cares about quality control." },
];

const ALSHAFI_FAQS = [
  { q: "Are Alshafi Herbal Products certified safe?", a: "All our products are prepared following traditional Unani and Ayurvedic formulation guidelines using quality-checked raw herbs. We recommend consulting a qualified healthcare provider before starting any new herbal supplement, especially if you are pregnant, nursing, or managing a medical condition." },
  { q: "How long does delivery take?", a: "Standard delivery within major Pakistani cities typically takes 2-4 business days. Remote areas may take 5-7 business days. You will receive tracking details via WhatsApp or SMS once your order ships." },
  { q: "Do you offer Cash on Delivery?", a: "Yes, Cash on Delivery (COD) is available across Pakistan for all orders. You can also pay online via bank transfer or JazzCash/EasyPaisa at checkout." },
  { q: "Can I return or exchange a product?", a: "Due to the nature of consumable herbal products, we can only accept returns for unopened, sealed items within 7 days of delivery. Please contact our support team via WhatsApp to begin a return." },
  { q: "Are your products suitable for daily use?", a: "Most of our products are formulated for regular use as part of a daily wellness routine. Please refer to the individual product's usage instructions, or consult a herbal practitioner for personalized guidance." },
  { q: "Do you ship internationally?", a: "Currently we ship within Pakistan only. International shipping is on our roadmap; subscribe to our newsletter to be notified when it becomes available." },
];

const ALSHAFI_CURRENCY_RATES = {
  PKR: { symbol: "Rs.", rate: 1 },
  USD: { symbol: "$", rate: 0.0036 },
  AED: { symbol: "د.إ", rate: 0.013 },
  SAR: { symbol: "﷼", rate: 0.0135 },
};

/**
 * AlshafiData — the ONLY interface pages should use to read content.
 * Swap the internals below to connect Firebase / Supabase / WooCommerce / a
 * custom REST API without touching any page-level code.
 */
const AlshafiData = {
  async getProducts(filters = {}) {
    // TODO(backend): replace with e.g.
    //   const res = await fetch('/api/products?' + new URLSearchParams(filters));
    //   return res.json();
    let items = [...ALSHAFI_PRODUCTS];
    if (filters.category) items = items.filter(p => p.category === filters.category);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      items = items.filter(p => p.name.toLowerCase().includes(q) || p.shortDesc.toLowerCase().includes(q));
    }
    if (filters.featured) items = items.filter(p => p.featured);
    if (filters.bestSeller) items = items.filter(p => p.bestSeller);
    if (filters.maxPrice) items = items.filter(p => p.price <= filters.maxPrice);
    if (filters.sort === "price-asc") items.sort((a, b) => a.price - b.price);
    if (filters.sort === "price-desc") items.sort((a, b) => b.price - a.price);
    if (filters.sort === "rating") items.sort((a, b) => b.rating - a.rating);
    return items;
  },
  async getProductBySlug(slug) {
    // TODO(backend): fetch(`/api/products/${slug}`)
    return ALSHAFI_PRODUCTS.find(p => p.slug === slug) || null;
  },
  async getRelated(product, limit = 4) {
    return ALSHAFI_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, limit);
  },
  async getCategories() {
    // TODO(backend): fetch('/api/categories')
    return ALSHAFI_CATEGORIES;
  },
  async getBlogPosts() {
    // TODO(backend): fetch('/api/posts') or WordPress REST: /wp-json/wp/v2/posts
    return ALSHAFI_BLOG_POSTS;
  },
  async getBlogPostBySlug(slug) {
    return ALSHAFI_BLOG_POSTS.find(p => p.slug === slug) || null;
  },
  async getTestimonials() {
    return ALSHAFI_TESTIMONIALS;
  },
  async getFaqs() {
    return ALSHAFI_FAQS;
  },
  getCurrencyRates() {
    return ALSHAFI_CURRENCY_RATES;
  },
  /**
   * Submits an order. Currently logs to console + returns a mock order ID.
   * TODO(backend): POST to Firebase/Supabase/WooCommerce order endpoint.
   */
  async submitOrder(orderPayload) {
    console.info("[AlshafiData] Order submitted (mock):", orderPayload);
    await new Promise(r => setTimeout(r, 600));
    return { success: true, orderId: "ASH-" + Date.now().toString().slice(-8) };
  },
  /**
   * Subscribes an email to the newsletter.
   * TODO(backend): connect to Mailchimp/ConvertKit/Firebase function.
   */
  async subscribeNewsletter(email) {
    console.info("[AlshafiData] Newsletter subscribe (mock):", email);
    await new Promise(r => setTimeout(r, 400));
    return { success: true };
  },
  /**
   * Submits the contact form.
   * TODO(backend): connect to Formspree/Firebase/EmailJS/custom API.
   */
  async submitContactForm(payload) {
    console.info("[AlshafiData] Contact form submitted (mock):", payload);
    await new Promise(r => setTimeout(r, 500));
    return { success: true };
  },
  /**
   * Validates a coupon code. Ready for future dynamic coupon backend.
   */
  async validateCoupon(code) {
    const coupons = {
      "WELCOME10": { type: "percent", value: 10, label: "10% off your first order" },
      "SAVE200": { type: "flat", value: 200, label: "Rs. 200 off" },
    };
    await new Promise(r => setTimeout(r, 300));
    const found = coupons[code.trim().toUpperCase()];
    return found ? { valid: true, ...found } : { valid: false };
  },
};

// Expose globally
window.AlshafiData = AlshafiData;
window.ALSHAFI_CURRENCY_RATES = ALSHAFI_CURRENCY_RATES;
