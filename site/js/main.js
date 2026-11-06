const cfg = window.MLCA || {};
const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
const form = document.querySelector("#signup-form");
const statusEl = document.querySelector("#form-status");
const submitBtn = form?.querySelector('button[type="submit"]');
const heardSelect = form?.querySelector('[name="heard_about"]');

const LIMITS = {
  parent_name: 80,
  email: 120,
  phone: 30,
  kid_name: 40,
  kid_age: 2,
  heard_about: 60,
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

function setStatus(message, isError) {
  if (!statusEl) return;
  statusEl.classList.toggle("error", Boolean(isError));
  statusEl.textContent = message;
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
  const heard = clip(raw.heard_about, LIMITS.heard_about);
  const payload = {
    parent_name: clip(raw.parent_name, LIMITS.parent_name),
    email: clip(raw.email, LIMITS.email).toLowerCase(),
    phone: clip(raw.phone, LIMITS.phone),
    kid_name: clip(raw.kid_name, LIMITS.kid_name),
    kid_age: clip(raw.kid_age, LIMITS.kid_age),
    heard_about: HEARD_OPTIONS.has(heard) ? heard : "",
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
    setStatus("Saved on this preview — it does not email Mac yet. The live form will.");
    form.reset();
    return;
  }

  if (submitBtn) submitBtn.disabled = true;
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
    setStatus("Sent. Mac will email you back.");
  } catch {
    setStatus(failMessage(), true);
  } finally {
    clearTimeout(timer);
    if (submitBtn) submitBtn.disabled = false;
  }
});
