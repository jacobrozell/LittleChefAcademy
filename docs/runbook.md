# Order of operations

Do these in order. Do not private the GitHub repo until Cloudflare is serving the site. Do not buy a domain unless Mac asks — he already has `macslittlechef.com`.

**Now:** waiting on Mac (via Paul). Preview is live: https://jacobrozell.github.io/LittleChefAcademy/

---

## 0. Right now (waiting)

Nothing to deploy. Do not rebuild in Squarespace. Do not add a CMS.

Ask Mac (or Paul) for the checklist in §1. His pace; he works three jobs.

---

## 1. Collect from Mac

Need before a real launch. Logo + email + domain yes/no are the blockers. Photos can ship as a second pass if he’s slow.

**Blockers**

- [ ] Logo file (promised)
- [ ] Email for signups (the inbox the form hits)
- [ ] Confirm URL: keep **macslittlechef.com** (default) or buy something else
- [ ] Squarespace / Google Domains access so DNS can move: add Jacob as a contributor, or he changes records himself while Jacob walks him through it. **Don’t take his password.** The domain also runs his Google email (MX/SPF are live), so that login can take over his inbox. See [security.md](security.md).

**Launch-quality, can follow a week later**

- [ ] 6–10 class photos (cutting boards / hands fine; no need for faces)
- [ ] 4–6 parent reviews (name + kid age is enough)
- [ ] One paragraph bio
- [ ] Ages, class length, where in PA, price or “contact for pricing”

Put files in `site/images/` (photos, logo). Keep Unsplash stand-ins until real photos exist.

---

## 2. Put his content on the page

Local: `python3 -m http.server 5173 --directory site`

- Swap the header seal / favicon for his logo
- Replace sample reviews and the “sample” labels
- Replace gallery images; drop the Unsplash credit
- Fill bio, PA town, ages in the about / classes copy
- Remove leftover “still needed from Mac” notes in the HTML (the `preview-only` class hides them when `preview: false`, but delete the notes anyway)

Do **not** set `preview: false` yet.

---

## 3. Wire the form

1. Mac (or Jacob using Mac’s email) creates a free [Web3Forms](https://web3forms.com) key.
2. Paste it in `site/js/config.js` → `web3formsKey`.
3. In the Web3Forms dashboard: domain-restrict if the plan allows. The page ships honeypot + `botcheck` only; it does **not** include the hCaptcha widget. If you turn on hCaptcha in the dashboard, also add the widget and the hCaptcha CSP domains (see the comment in `site/_headers`), or every real signup may be rejected.
4. Paste Mac’s public email into `contactEmail` (footer link + fallback in the form’s error message). Leave `""` if he doesn’t want it shown.
5. Send a test signup. Confirm it lands in Mac’s inbox, not Jacob’s, and that the “How did you hear” answer comes through.
6. Leave `preview: true` until the custom domain is on.

Details: [prod.md](prod.md).

---

## 4. Deploy to Cloudflare Pages (repo still public)

GitHub Pages dies if the repo goes private on GitHub Free. Stand up Cloudflare **first**.

1. Cloudflare dashboard → Workers & Pages → Create → connect `jacobrozell/LittleChefAcademy`.
2. Limit the GitHub App to **this repo only**.
3. Build command: none. Output directory: **`site`**. Branch: `main`.
4. Open the `*.pages.dev` URL. Confirm it is the brochure, not `docs/spec.md`.
5. Optional: Cloudflare Web Analytics → paste token into `cloudflareBeacon` in `config.js`, push.

Push host: personal git only. Confirm `git remote get-url --push origin` contains `github.com-personal`. Do not use `gh`.

Folder `MacsLittleChefsAcademy` → GitHub `LittleChefAcademy`.

More: [hosting.md](hosting.md).

---

## 5. Point the domain

Default: **macslittlechef.com** (Squarespace registrar, currently 404s on Squarespace).

1. Add the custom domain on the Cloudflare Pages project.
2. At Squarespace Domains / Google Domains DNS, follow Cloudflare’s records (usually `www` CNAME to the pages target; apex ALIAS/ANAME or A records as CF shows). Orange-cloud if the zone is on Cloudflare.
3. SSL: let Cloudflare issue the cert. Wait until https://www.macslittlechef.com loads the brochure.
4. Only buy a different domain if Mac asks. Do not buy `LittleChefAcademy.com` “just in case.”

---

## 6. Release (go live)

In `site/js/config.js`:

- `preview: false` — hides draft banners
- keys from §3 and analytics from §4 already in

Turn on search indexing **by hand**. `preview: false` does not do it. Google may skip JS on a page whose HTML says `noindex`, so a JS flip is not reliable.

- [ ] `site/index.html`: `<meta name="robots">` → `index, follow`
- [ ] `site/privacy.html`: leave `noindex` (fine either way)
- [ ] `site/robots.txt` → replace with:
  ```
  User-agent: *
  Allow: /

  Sitemap: https://www.macslittlechef.com/sitemap.xml
  ```
- [ ] Add `site/sitemap.xml` with the one URL `https://www.macslittlechef.com/`
- [ ] Swap every `jacobrozell.github.io/LittleChefAcademy` URL in `index.html` (`canonical`, `og:url`, `og:image`) for `https://www.macslittlechef.com/`
- [ ] Structured data (`application/ld+json` in `index.html`): add Mac’s town as `address` (`addressLocality`, `addressRegion: "PA"`), plus `telephone` / `email` / `sameAs` (Instagram, Facebook, Google Business Profile) if he has them. Change `areaServed` to his county or town list. Check with Google’s Rich Results Test.
- [ ] Put his town in the `<title>`, meta description and hero eyebrow (local search).
- [ ] Google Search Console: verify the domain, submit the sitemap.

Then:

1. Push `main` (personal remote). Cloudflare deploys.
2. Click through: home, form test signup, privacy page, mobile.
3. Tell Mac / Paul the live URL (`https://macslittlechef.com` or `www`).
4. GitHub Pages preview can stay up until §7; it is no longer the public URL.

---

## 7. Private the GitHub repo

Only after §4–6 are green.

1. GitHub repo Settings → Change visibility → **Private**.
2. Confirm `*.pages.dev` and the custom domain still work (Cloudflare still has repo access).
3. Disable GitHub Pages and/or delete `.github/workflows/pages.yml`.
4. The spec, texts, and money notes are no longer on the public internet. The **website** stays public.

---

## 8. Future updates (Jacob is the CMS)

Mac texts photos or copy. He does not get a CMS login.

```sh
cd ~/Desktop/personal/sites/MacsLittleChefsAcademy
python3 -m http.server 5173 --directory site   # look locally
# edit site/ … then:
git remote get-url --push origin   # must contain github.com-personal
git push origin main               # Cloudflare rebuilds
```

Typical jobs:

| Ask | What to do | Time |
|---|---|---|
| New photos | Drop originals in `site/images/`, run `scripts/optimize-images.sh <file>` (makes `-640.webp` / `-1280.webp`), then update that `<img>`'s `src`, `srcset` (use the real widths it prints), `width`/`height`. Hero photos keep `fetchpriority="high"`; gallery photos keep `loading="lazy"`. | 15–30 min |
| New review | Edit the reviews block in `index.html` | 10 min |
| Copy / hours / town | Edit the about / classes sections | 10–20 min |
| Logo tweak | Swap header + `favicon.svg` | 15 min |
| Form broken | Web3Forms dashboard + one test submit | 15 min |
| Domain / HTTPS | Cloudflare + registrar DNS | 15–45 min |

A few times a year, unprompted: send one test signup, glance at Cloudflare, check the domain cert.

---

## 9. Price (what to tell Paul / Mac)

The build is mostly done. Hosting is free. He already pays for the domain at Squarespace.

### Quote

| Item | Fair range | What’s in it |
|---|---|---|
| **Launch** | **$400–$800** (clean number: **$500**) | His content on the page, live `macslittlechef.com`, working form to his email, Cloudflare, captcha/honeypot, privacy page. Stranger quote $800–$2,000. $3k+ is too much. |
| Hosting | **$0** | Cloudflare Pages. |
| Domain | **~$12–20/yr** | He already has `macslittlechef.com`. |
| Form (now) | **$0** | Web3Forms free, 250 signups/mo. |
| **Watch** | **$50 per content update**, or **$250/yr** | Year covers uptime, HTTPS, photo/review/copy swaps, periodic checkup. Per-update is $50 each time he sends a batch. |

Launch does **not** include: payments, class calendar, student accounts, a CMS he logs into, or rebuilding in Squarespace.

Technical what-ifs: [scaling.md](scaling.md). Say the next block out loud so it isn’t a surprise later.

### What to tell Mac about later

Say this in a voice chat, then follow up in text. Numbers are pass-through tools + your time, not a new “website rebuild.”

**The site itself will not fall over from traffic.** It’s a simple page on Cloudflare. If random internet junk or an AI crawler hammers the address, that’s absorbed for free. You turn on their bot protection at launch (included). You’d only look at paying Cloudflare ~$25/mo if it got ugly *and* real parents were getting blocked — unlikely, and you’d ask him first.

**Spam in the signup form** (fake messages, bots): launch already has a captcha. If his inbox still gets junk, next steps are tightening the form (often ~$12/mo for the form tool) or, if it’s still bad, a small extra filter in front of the form (**~$150–$300 once**). Included in watch: noticing it and turning the form off if it’s a flood. Not included: building that extra filter until it’s actually happening.

**A lot of real signups:** free form tool caps at **250/month**. If he’s heading toward that, you warn him. At **~500/month** the form tool is about **$12/mo** (he pays that, or it’s billed through you at cost). That’s the easy part. The hard part is **him**: 500 emails is ~16 a day. The brochure cannot answer those for him. Then you’d talk about a spreadsheet + auto-reply (small, on the watch fee or a few hours) or a real calendar/waitlist (**new project, new quote** — not this $500 site).

**If the class becomes a real operation** (payments, schedules, hundreds of families): that’s a different product. You’d estimate it separately. This site stays the public page.

### What’s included vs extra

| Scenario | Included in watch / launch? | If it happens, money |
|---|---|---|
| Normal photos / copy / “is it up?” | Yes on the **$250/yr** plan; else **$50** per content update | — |
| Internet DDoS / AI crawlers hitting the page | Yes — Cloudflare, $0, you glance | CF Pro **~$25/mo** only if you both agree it’s needed |
| Form junk, you flip captcha / pause the form | Yes (watch) | — |
| Form junk that needs the paid form plan or domain lock | You do the click; **tool is pass-through** | Web3Forms Pro **~$12/mo** |
| Form junk that needs a custom filter (Worker) | No — new small job | **~$150–$300 once** |
| Approaching 250 real signups/mo | Yes — you warn him | — |
| 500 real signups/mo | You upgrade the form tool | **~$12/mo** tool + talk about his inbox |
| Spreadsheet + “Mac will email you” auto-reply | Small, can sit on watch or a few hours | **$0–$150** |
| Calendar, payments, waitlist portal | No | **New estimate** (hours × rate, not this brochure) |

Don’t pre-charge him for Pro tools or the Worker. Don’t hide that 250/mo is a ceiling.

Client-facing writeup (send this, not this runbook): [handoff-for-mac.md](handoff-for-mac.md).

### Pasteable note (Paul / Mac)

You can send this as-is:

> The site is a simple page. Traffic and random internet attacks sit on Cloudflare and don’t cost extra. Signups go to your email; the free form allows 250 a month, which is plenty until classes are slammed. If you ever get near that, the paid form is about $12/month and we’d talk — 500 real signups a month is more a “you need a waitlist or a calendar” problem than a website problem. If bots spam the form, we’ve already got a captcha; if that isn’t enough we’d tighten it, and only charge extra if we have to build a custom filter. After launch, keeping it going is $50 per content update or $250 a year. Bigger stuff like online payments or booking is a separate project if you ever want it.

---

## 10. Stop / don’t

- Don’t private GitHub before Cloudflare is live
- Don’t use `gh` (this machine is logged in as work)
- Don’t push as `jrozellOCV`
- Don’t buy a second domain unless he asks
- Don’t rebuild in Squarespace unless he decides he wants to edit it himself
- Don’t add GA4, WordPress, or a CMS
- Don’t publish `docs/` — only `site/`
