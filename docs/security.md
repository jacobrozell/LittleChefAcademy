# Security audit — 2026-11-06

Basic audit of the site, repo, hosting and domain. The site is a static brochure with one form, so the attack surface is small. **The real risks are accounts and the public repo, not the page code.**

Legend: **Fixed** = done in code. **Action** = someone has to do it. **Accepted** = known, fine for now.

---

## High

### 1. The GitHub repo is public, and `docs/` contains private material — Action (Jacob)

`github.com/jacobrozell/LittleChefAcademy` returns 200 to anyone. `docs/spec.md` quotes private texts between Jacob, Paul and Mac, mentions that Mac works three jobs, and includes pricing. The handoff and runbook carry prices too. The **website** doesn't publish `docs/` (all checked paths 404), but the repo does.

- Pushing the unpushed commits adds the marketing plan and AI guide to the public repo too.
- Fix: follow [hosting.md](hosting.md): stand up Cloudflare Pages, then make the repo private. Until then, consider not pushing `docs/` changes, or make the repo private now and accept that the GitHub Pages preview goes down.
- Git history keeps everything ever committed, so going private is the fix. Deleting the files later is not.

### 2. Accounts that control the site have no confirmed 2FA — Action (Jacob + Mac)

The page can't be hacked in an interesting way. The accounts behind it can be:

| Account | Why it matters | Do |
|---|---|---|
| **Mac's Squarespace (domain)** | Controls `macslittlechef.com` **and** his email (MX/SPF point at Google). Whoever has it can redirect the site and read or reset his mail. | 2FA on. Registrar/transfer lock on. Add Jacob as a contributor, never share the password (runbook and handoff updated). |
| **Mac's email inbox** (Google) | Every signup lands here: parent names, emails, phones, kids' first names and ages. | 2FA on. Don't forward signups to personal accounts. Delete old signups he no longer needs. |
| **Jacob's GitHub** | Push access = change the live site. | 2FA on (likely already). |
| **Cloudflare** (once live) | Controls hosting, headers and analytics. | 2FA on. GitHub App limited to this one repo (runbook §4). |
| **Web3Forms** | Where the form key lives; can change the destination inbox. | 2FA if offered; sign up with Mac's email. |

### 3. The domain can be spoofed in email — Action (Mac, Jacob can walk him through)

`macslittlechef.com` has Google mail set up (MX `smtp.google.com`, SPF `include:_spf.google.com ~all`) but **no DMARC record**. Anyone can send email that claims to be from `@macslittlechef.com`, for example a fake "class payment" request to parents.

- In Google Admin: turn on DKIM signing for the domain.
- Add DNS TXT `_dmarc.macslittlechef.com` → `v=DMARC1; p=none; rua=mailto:<mac's email>`. After a couple of weeks with clean reports, change `p=none` to `p=quarantine`.
- Optional: CAA record `0 issue "letsencrypt.org"` plus whatever Cloudflare uses, so only those authorities can issue certificates.

---

## Medium

### 4. Form spam and abuse — Accepted, with a plan

The honeypot and `botcheck` run in the browser, so a script can skip them and post straight to Web3Forms with the public key. That's how every static-site form works. The key can only email Mac. It can't read anything.

- Worst case: spam in Mac's inbox, or a phishing link inside a "signup." **Mac should treat signup emails like any email from a stranger: don't click links in the message field.**
- The plan already exists in [scaling.md](scaling.md): domain-restrict the key, hCaptcha (widget + CSP, runbook §3), then a Worker if needed.

### 5. The GitHub Pages preview has no security headers — Accepted until Cloudflare

GitHub Pages only sends HSTS. No CSP header, no `X-Frame-Options`, no `nosniff`. The page's `<meta>` CSP still blocks foreign scripts, but the preview could be framed (clickjacking), which matters little on a page with only a signup form. `site/_headers` covers all of this once the site is on Cloudflare Pages.

### 6. Privacy page didn't name the form service — Fixed

The privacy page now says signups are delivered through Web3Forms. Before launch, check Web3Forms' current data-retention terms and adjust the wording if they keep copies.

---

## Low

### 7. Section links could throw on odd hrefs — Fixed

The nav highlighter and the "show section after a nav jump" code used `querySelector(href)`, which throws on hrefs like `#` or `#1-thing`. Both now use `getElementById`.

### 8. Third-party requests — Accepted

- **Google Fonts**: every visitor's IP goes to Google. Normal for US small-business sites. Self-hosting the two fonts would remove it and simplify the CSP. Optional.
- **Cloudflare Web Analytics** (off until a token is set): cookie-less. Its script can't carry an integrity hash because Cloudflare updates it, which is standard.
- No ad pixels, no trackers, no npm packages, no build step: nothing in the dependency chain to compromise.

### 9. GitHub Actions workflow — Accepted (temporary)

`pages.yml` uses actions by version tag, not pinned commit SHA, with minimal permissions. It's deleted when the site moves to Cloudflare (runbook §7), so not worth hardening.

### 10. Extra headers — Fixed

Added `Cross-Origin-Opener-Policy: same-origin` and widened `Permissions-Policy` (`usb`, `browsing-topics`) in `site/_headers`.

---

## Checked and fine

- **No secrets** anywhere in git history (no API keys, tokens or passwords). `config.js` holds only public values.
- **No HTML-injection sinks**: no `innerHTML`, `eval` or inline event handlers. Form messages are shown with `textContent`, and user input is never written into the page.
- **Form payload** is allowlisted: only known fields are sent, length-capped, the "How did you hear" answer must match a dropdown option, and the age is range-checked.
- **CSP** (meta and `_headers`): scripts only from this site and Cloudflare's analytics, no inline scripts (the JSON-LD block is data), `object-src 'none'`, `base-uri 'self'`, form posts only to Web3Forms.
- **HTTPS**: HTTP redirects to HTTPS on the preview, and HSTS (without `preload`) is set for production.
- **Published files**: only `site/` is deployed. `docs/`, `README.md`, `AGENTS.md` and the workflow all 404 on the preview.
- **Kids' data**: parents fill the form, not kids. Only first name and age are collected, and nothing is stored by the site.
- **Local dev server** binds to `127.0.0.1` only.

---

## Before-launch security checklist

- [ ] Cloudflare Pages live, then GitHub repo **private** (finding 1)
- [ ] 2FA on Squarespace, Mac's Google mail, GitHub, Cloudflare, Web3Forms (finding 2)
- [ ] Registrar lock on `macslittlechef.com` (finding 2)
- [ ] DKIM on, DMARC record added (finding 3)
- [ ] Web3Forms key on Mac's email, domain-restricted if the plan allows (finding 4)
- [ ] One test signup after launch, and confirm headers with `curl -sI https://www.macslittlechef.com/` (finding 5)
- [ ] Re-read Web3Forms' retention terms against `privacy.html` (finding 6)
