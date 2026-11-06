const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
const form = document.querySelector("#signup-form");
const statusEl = document.querySelector("#form-status");

// Paste a key from https://web3forms.com to send signups to Mac's email.
const WEB3FORMS_KEY = "";

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  mobileNav.hidden = open;
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    mobileNav.hidden = true;
  });
});

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusEl.classList.remove("error");

  if (!form.checkValidity()) {
    form.reportValidity();
    statusEl.classList.add("error");
    statusEl.textContent = "Fill in parent name, email, kid’s name, and age.";
    return;
  }

  const data = Object.fromEntries(new FormData(form));

  if (!WEB3FORMS_KEY) {
    statusEl.textContent =
      "Saved on this preview — it does not email Mac yet. The live form will.";
    form.reset();
    return;
  }

  statusEl.textContent = "Sending…";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: "Mac's Little Chefs Academy signup",
        ...data,
      }),
    });

    if (!response.ok) throw new Error("Send failed");

    form.reset();
    statusEl.textContent = "Sent. Mac will email you back.";
  } catch {
    statusEl.classList.add("error");
    statusEl.textContent = "Couldn’t send just now. Try again, or email Mac directly.";
  }
});
