# Scale, abuse, and “what if”

Plans for when the class actually takes off, or when bots show up. **Do not build any of this until the trigger in that row fires.**

What to tell Mac, and what is included vs extra: [runbook.md](runbook.md) §9. The brochure on Cloudflare Pages will not fall over from traffic. The weak points are **Web3Forms’ monthly cap**, **Mac’s inbox**, and **direct POSTs to the public form key**.

The form does **not** POST to our origin. The browser talks to `https://api.web3forms.com`. Cloudflare in front of the **page** does not rate-limit that API. Captcha + Web3Forms settings matter more than a fancy origin WAF for signup spam.

---

## 1. Page traffic / AI DDoS on the website

Static files on Cloudflare Pages. Unmetered DDoS is on for every CF plan. A flood of GETs costs us **$0** and does not take the site down in any scenario this business will see.

| Trigger | Do this | Cost |
|---|---|---|
| Domain is on Cloudflare (launch) | Turn on **Bot Fight Mode**. Turn on **Block AI Bots**. | $0 |
| Scrapers / cheap bots after launch | Leave those two on. Check Security → Events if the site “feels slow” (it won’t be origin-slow; it might be challenge-slow for real users). | $0 |
| Obvious L7 flood | Do nothing first. CF DDoS is automatic. Glance at the dashboard. | $0 |
| Need a blunt cap on our hostname | Free plan: **one** rate-limit rule, IP-based, 10s window, 10s block. Example: path `/` or whole zone, ~100 req / 10s / IP → Challenge. | $0 |
| False positives (parents challenged) | Ease the rule. Do not buy Super Bot Fight Mode unless it’s a real problem. | — |
| Still getting smashed and the dashboard is ugly | Cloudflare **Pro** (~$25/mo) for better rate-limit windows and Super Bot Fight Mode. Unlikely. | ~$25/mo |

Do not add a VPS, fail2ban, or “AI DDoS product.” That is the wrong shape.

**Block AI Bots** is for crawlers hitting the **site**, not for ChatGPT writing fake signups. Fake signups are §2–3.

---

## 2. Signups: 50 → 250 → 500 / month

| Volume | Form product | Mac’s actual job | What we change |
|---|---|---|---|
| &lt; 250/mo | Web3Forms **Free** (250) | He emails back in his spare time. Fine. | Nothing. |
| Approaching 200/mo | Still free | He’s getting busy. | Watch the dashboard. Warn him before a hard cut-off. |
| **500/mo** | Web3Forms **Pro** (~$12/mo, 10k) | **~16 emails a day.** He cannot personally work a waitlist of that size in spare time. | Upgrade Web3Forms. Add a webhook → Google Sheet (Pro). Optional auto-reply (“Mac will write back”). Talk about a calendar (Calendly) or a helper — that’s a **new product**, new estimate. |
| 1k+/mo | Same form, or Typeform/Tally + sheet | This is a staffed program, not a brochure. | New estimate: waitlist, payments, schedule. Do not bolt that onto this HTML page. |

500 signups is not a hosting problem. Cloudflare does not care. **The bottleneck is Mac.**

When upgrading Web3Forms: keep the same `web3formsKey` if they let you; enable **domain restriction** (Pro) so the key only works from `macslittlechef.com` / `*.pages.dev`.

---

## 3. Form spam / AI filling the form

Attack: bots POST to Web3Forms with the public access key and flood Mac’s inbox. They can skip our page entirely.

**At launch (already planned)**

- Honeypot + `botcheck` in `site/js/main.js`
- hCaptcha in the Web3Forms dashboard
- Field length caps; allowlist payload (already in JS)
- Mac learns to spam-button obvious junk

**If he starts getting junk (not just volume of real parents)**

1. Confirm captcha is actually required in the Web3Forms dashboard.
2. Upgrade to Pro → **restrict to our domains**.
3. Cloudflare **Turnstile** on the form (Web3Forms Pro) if hCaptcha isn’t enough.
4. Temporary kill switch: set `web3formsKey: ""` in `config.js`, push, site falls back to “not wired.” Or take the form section down.

**If junk continues (direct API abuse)**

Proxy the form through a **Cloudflare Worker** on `macslittlechef.com` so POSTs hit *our* hostname:

- Browser → `https://macslittlechef.com/api/signup` (Worker)
- Worker checks Turnstile, rate-limits by IP (e.g. 5 / 10 min), then forwards to Web3Forms
- CF rate-limit rule can target `/api/signup`
- Access key stays in a Worker secret, not in `config.js`

Do **not** write that Worker until step 1–3 have failed. It’s a half-day job and a new estimate (~$150–$300 once, still $0 run).

Client-side “only one submit per 10s” in JS is a courtesy. Bots ignore it.

---

## 4. Email / inbox

| Trigger | Plan |
|---|---|
| Normal | Gmail/whatever Mac already uses. Signup email is the log. |
| Spam mixed with real | Filters: subject `Mac's Little Chefs Academy signup`. |
| 500/mo real | Sheet via webhook. He works the sheet, not the inbox. Auto-reply. |
| Flood of spam | Kill switch in §3. Rotate the Web3Forms key (new key in `config.js`, old key delete). |

We do not store signups on the website. If the sheet exists, that’s Mac’s copy — mention it on `privacy.html` if we add it.

---

## 5. Cost ladder (only pay when a trigger hits)

| Stage | Monthly |
|---|---|
| Launch | $0 host + domain he already has |
| 500 real signups/mo | + ~$12 Web3Forms Pro |
| Annoying bots, still fine | $0 (Bot Fight Mode, captcha) |
| Need better CF rate limits / bot controls | + ~$25 Cloudflare Pro |
| Form API abuse | Worker (one-time), still $0 run |
| Payments / calendar / waitlist portal | **New project**, not this stack |

Do not pre-buy Pro plans.

---

## 6. What we will not do

- No Kubernetes, queues, Redis, or “scale the monolith”
- No moving off Cloudflare because of traffic
- No GA4 “to see the DDoS”
- No paying a DDoS vendor in front of Cloudflare
- No student accounts “because 500 signups” — that’s a different app

When someone says “scale,” check which row fired: **page flood**, **form cap**, **inbox**, or **he needs software**. Only the last one is a rebuild.
