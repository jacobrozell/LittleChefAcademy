(function boot() {
  const cfg = window.MLCA || {};
  document.documentElement.dataset.preview = cfg.preview ? "true" : "false";

  // Indexing is NOT flipped here. Google may skip running JS on a page whose
  // HTML says noindex, so the robots meta and robots.txt are edited by hand
  // at launch. See docs/runbook.md §6.

  if (!cfg.cloudflareBeacon) return;

  const script = document.createElement("script");
  script.defer = true;
  script.src = "https://static.cloudflareinsights.com/beacon.min.js";
  script.setAttribute(
    "data-cf-beacon",
    JSON.stringify({ token: cfg.cloudflareBeacon }),
  );
  document.head.appendChild(script);
})();
