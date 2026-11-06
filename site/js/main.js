const cfg = window.MLCA || {};
const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
const form = document.querySelector("#signup-form");
const statusEl = document.querySelector("#form-status");
const submitBtn = form?.querySelector('button[type="submit"]');
const heardSelect = form?.querySelector('[name="heard_about"]');
const heardOtherField = document.querySelector("#heard-other-field");
const heardOtherInput = heardOtherField?.querySelector("input");

const LIMITS = {
  parent_name: 80,
  email: 120,
  phone: 30,
  kid_name: 40,
  kid_age: 2,
  heard_about: 60,
  heard_about_other: 80,
  message: 1000,
};

const REQUEST_TIMEOUT_MS = 15000;

// Only send "how did you hear" answers that are actually in the dropdown.
const HEARD_OPTIONS = new Set(
  heardSelect ? [...heardSelect.options].map((o) => o.value).filter(Boolean) : [],
);

function looksLikeEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const contactEmail = looksLikeEmail(String(cfg.contactEmail || ""))
  ? String(cfg.contactEmail)
  : "";

document.querySelectorAll("[data-contact-email]").forEach((link) => {
  if (!contactEmail) return;
  link.href = `mailto:${contactEmail}`;
  link.textContent = contactEmail;
  link.hidden = false;
});

function setMenu(open) {
  if (!menuButton || !mobileNav) return;
  menuButton.setAttribute("aria-expanded", String(open));
  mobileNav.hidden = !open;
}

menuButton?.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuButton.focus();
  }
});

// "Other" reveals an optional write-in box.
function syncHeardOther() {
  if (!heardOtherField || !heardSelect) return;
  const show = heardSelect.value === "Other";
  heardOtherField.hidden = !show;
  if (!show && heardOtherInput) heardOtherInput.value = "";
}

heardSelect?.addEventListener("change", syncHeardOther);
// reset() doesn't fire "change", so re-sync after the form clears.
form?.addEventListener("reset", () => setTimeout(syncHeardOther));

// kind: true or "error" for problems, "success" when it went through.
function setStatus(message, kind) {
  if (!statusEl) return;
  statusEl.classList.toggle("error", kind === true || kind === "error");
  statusEl.classList.toggle("success", kind === "success");
  statusEl.textContent = message;
  // Restart the little fade-in each time the message changes.
  statusEl.classList.remove("is-visible");
  if (message) {
    void statusEl.offsetWidth;
    statusEl.classList.add("is-visible");
  }
}

function setBusy(busy) {
  if (!submitBtn) return;
  submitBtn.disabled = busy;
  if (busy) submitBtn.setAttribute("aria-busy", "true");
  else submitBtn.removeAttribute("aria-busy");
}

function clip(value, max) {
  return String(value || "")
    .trim()
    .slice(0, max);
}

function failMessage() {
  return contactEmail
    ? `Couldn’t send just now. Try again, or email Mac at ${contactEmail}.`
    : "Couldn’t send just now. Try again in a few minutes.";
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  setStatus("");

  const honey = form.querySelector('[name="website"]');
  const botcheck = form.querySelector('[name="botcheck"]');
  if ((honey && honey.value) || (botcheck && botcheck.checked)) {
    setStatus("Sent. Mac will email you back.");
    form.reset();
    return;
  }

  if (!form.checkValidity()) {
    form.reportValidity();
    setStatus("Fill in parent name, email, kid’s first name, and age.", true);
    return;
  }

  const raw = Object.fromEntries(new FormData(form));
  const heardChoice = clip(raw.heard_about, LIMITS.heard_about);
  let heard = HEARD_OPTIONS.has(heardChoice) ? heardChoice : "";
  const heardOther = clip(raw.heard_about_other, LIMITS.heard_about_other);
  if (heard === "Other" && heardOther) heard = `Other: ${heardOther}`;

  const payload = {
    parent_name: clip(raw.parent_name, LIMITS.parent_name),
    email: clip(raw.email, LIMITS.email).toLowerCase(),
    phone: clip(raw.phone, LIMITS.phone),
    kid_name: clip(raw.kid_name, LIMITS.kid_name),
    kid_age: clip(raw.kid_age, LIMITS.kid_age),
    heard_about: heard,
    message: clip(raw.message, LIMITS.message),
  };

  if (!payload.parent_name || !payload.kid_name || !payload.kid_age) {
    setStatus("Fill in parent name, email, kid’s first name, and age.", true);
    return;
  }

  if (!looksLikeEmail(payload.email)) {
    setStatus("Use a real email so Mac can write back.", true);
    return;
  }

  const age = Number(payload.kid_age);
  if (!/^\d{1,2}$/.test(payload.kid_age) || age < 1 || age > 18) {
    setStatus("Kid’s age should be a number from 1 to 18.", true);
    return;
  }

  if (!cfg.web3formsKey) {
    setStatus("Saved on this preview — it does not email Mac yet. The live form will.", "success");
    form.reset();
    return;
  }

  setBusy(true);
  setStatus("Sending…");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        access_key: cfg.web3formsKey,
        subject: "Mac's Little Chefs Academy signup",
        from_name: "Mac's Little Chefs Academy",
        botcheck: "",
        ...payload,
      }),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success === false) throw new Error("Send failed");

    form.reset();
    setStatus("Sent. Mac will email you back.", "success");
  } catch {
    setStatus(failMessage(), true);
  } finally {
    clearTimeout(timer);
    setBusy(false);
  }
});

// ---------- Scroll polish ----------

const header = document.querySelector(".site-header");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function syncHeaderShadow() {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
}
syncHeaderShadow();
window.addEventListener("scroll", syncHeaderShadow, { passive: true });

// Mark the nav link for whichever section is in the middle of the screen.
const navLinks = [...document.querySelectorAll('.nav a[href^="#"], .mobile-nav a[href^="#"]')];
const spyTargets = [...new Set(["#top", ...navLinks.map((a) => a.getAttribute("href"))])]
  .map((id) => document.querySelector(id))
  .filter(Boolean);

if ("IntersectionObserver" in window && spyTargets.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        navLinks.forEach((a) => {
          if (a.getAttribute("href") === id) a.setAttribute("aria-current", "location");
          else a.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  spyTargets.forEach((el) => spy.observe(el));
}

// Fade sections up as they arrive. Skipped for reduced motion or old browsers,
// so content is never hidden without this script.
const REVEAL_SELECTOR = [
  ".steps-grid > article",
  ".about-grid > *",
  ".classes .eyebrow",
  ".classes h2",
  ".card",
  ".reviews .eyebrow",
  ".reviews h2",
  ".reviews .section-lead",
  ".recipe-card",
  ".photos .eyebrow",
  ".photos h2",
  ".photos .section-lead",
  ".gallery figure",
  ".signup-grid > *",
].join(", ");

if (!reduceMotion && "IntersectionObserver" in window) {
  const revealer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        revealer.unobserve(el);
        el.classList.add("is-visible");
        // Drop the reveal classes afterwards so hover effects use their own timing.
        const delay = parseInt(el.style.getPropertyValue("--reveal-delay"), 10) || 0;
        setTimeout(() => {
          el.classList.remove("reveal", "is-visible");
          el.style.removeProperty("--reveal-delay");
        }, delay + 700);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );

  document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
    const index = [...el.parentElement.children].indexOf(el);
    el.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 70}ms`);
    el.classList.add("reveal");
    revealer.observe(el);
  });
}
