/**
 * faq.js — renders the FAQ accordion + FAQPage schema on faq.html.
 */
(function () {
  document.addEventListener("DOMContentLoaded", async () => {
    const faqs = await AlshafiData.getFaqs();
    const wrap = document.getElementById("faqAccordion");
    wrap.innerHTML = faqs.map((f, i) => `
      <div class="accordion-item">
        <button class="accordion-trigger" id="faqTrigger${i}" aria-expanded="false" aria-controls="faqPanel${i}">
          <span>${f.q}</span>
          ${AlshafiIcons.plus}
        </button>
        <div class="accordion-panel" id="faqPanel${i}" role="region" aria-labelledby="faqTrigger${i}">
          <div class="accordion-panel-inner"><p>${f.a}</p></div>
        </div>
      </div>
    `).join("");

    document.getElementById("faqSchema").textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
    });

    wrap.querySelectorAll(".accordion-trigger").forEach(trigger => {
      trigger.addEventListener("click", () => {
        const panel = document.getElementById(trigger.getAttribute("aria-controls"));
        const isOpen = trigger.getAttribute("aria-expanded") === "true";
        // Close all other panels (single-open accordion)
        wrap.querySelectorAll(".accordion-trigger").forEach(t => t.setAttribute("aria-expanded", "false"));
        wrap.querySelectorAll(".accordion-panel").forEach(p => p.style.maxHeight = null);
        if (!isOpen) {
          trigger.setAttribute("aria-expanded", "true");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });

    // Recalculate open panel height on resize so wrapped text doesn't get clipped
    window.addEventListener("resize", AlshafiUtils.debounce(() => {
      const openTrigger = wrap.querySelector('.accordion-trigger[aria-expanded="true"]');
      if (!openTrigger) return;
      const panel = document.getElementById(openTrigger.getAttribute("aria-controls"));
      panel.style.maxHeight = panel.scrollHeight + "px";
    }, 200));
  });
})();
