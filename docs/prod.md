# Production: security, analytics, logging

Static brochure. No app server. Do not add Datadog, Sentry, or GA4.

Long-term host is **Cloudflare Pages** from a **private** GitHub repo. See [hosting.md](hosting.md). GitHub Pages is the preview only.

## What the site does today

| Layer | What you get |
|---|---|
| GitHub Pages (preview) | HTTPS, `site/` only. **No access logs. No custom headers.** Repo is currently public — spec is visible on GitHub. |
| Page | CSP + referrer via meta. Preview banner hides when `preview: false` in `site/js/config.js`. `noindex` + `robots.txt Disallow` until launch. |
| Form | Honeypot + Web3Forms `botcheck`. Field length caps. Allowlist payload (the “How did you hear” value must match a dropdown option). Kid’s age 1–18. 15s request timeout. Status text via `textContent` only, never echoes user input. Key lives in `config.js` (public by design). |
| Privacy | `site/privacy.html`. Parent submits; no database on this host. |
| Analytics | Off until `cloudflareBeacon` is set. Cookie-less page views only. Never send form fields. |
| Logging | Signup **email** is the signup log. Page hits: Cloudflare dashboard after the move. |

## Flip to live (`site/js/config.js`)

1. `preview: false` — drop the draft banner, allow indexing.
2. `web3formsKey` — [web3forms.com](https://web3forms.com) on **Mac’s email**. Domain restrict if the plan allows (`macslittlechef.com`, `*.pages.dev`). Don’t enable dashboard hCaptcha without adding the widget (runbook §3).
3. `cloudflareBeacon` — Cloudflare Web Analytics token.
4. `contactEmail` — Mac’s public email, or `""` to hide it.
5. Indexing is a manual edit (robots meta + `robots.txt`), not a config flag. Runbook §6.

## Headers

`site/_headers` is honored on **Cloudflare Pages**. GitHub Pages ignores it.

The page also carries a `<meta>` CSP (the only CSP on GitHub Pages). On Cloudflare the browser enforces **both**, so a source missing from either is blocked. Keep them in sync. Both are least-privilege as of 2026-11-06: no hCaptcha, no `web3forms.com` script, `object-src 'none'`. HSTS has no `preload` (that is a hard-to-undo commitment for a domain Mac owns at Squarespace).

The JSON-LD block in `index.html` is data, not script; CSP doesn’t need to allow it.

If anything still proxies GitHub Pages, set the same values as Cloudflare Transform Rules (CSP, `Referrer-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Permissions-Policy`, HSTS). Prefer moving host instead.

## What we do not collect

- No accounts, login cookies, or student records
- Analytics must not receive parent name, kid name, age, or email
- No ad pixels
- Form is parents-only

## Watch list (retainer)

A few times a year: test one signup, domain/HTTPS, Web3Forms cap (free = 250/mo), photos Mac texts, Cloudflare dashboard if the form breaks.
