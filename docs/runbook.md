# Order of operations

Do these in order. Section numbers are referenced from other docs, so keep them stable.

**Status (2026-11-06):** the site is built, polished, responsive, security-audited, and the form is verified end to end. Waiting on Mac's content. The GitHub repo is **public** and has unpushed commits; see §0 before pushing anything.

Preview today: https://jacobrozell.github.io/LittleChefAcademy/ (old build until the next push).

Related: [security.md](security.md) (risks + checklist) · [marketing-plan.md](marketing-plan.md) · [ai-guide.md](ai-guide.md) · [prod.md](prod.md) · [hosting.md](hosting.md) · [scaling.md](scaling.md)

---

## 0. Right now

Nothing here needs Mac.

1. **Decide how to stop publishing private notes.** The repo is public, and `docs/` has Paul and Mac's texts, pricing, the marketing plan and the security audit. The website never serves `docs/`, but GitHub does. Best order, without waiting for Mac:
   1. Do **§4** now (Cloudflare Pages on the `*.pages.dev` URL; no domain needed yet).
   2. Then **§7** (make the repo private, turn off GitHub Pages).
   3. Then push the waiting commits. The `pages.dev` URL becomes the preview link for Mac and Paul.

   If you'd rather push first, the GitHub Pages preview updates, but everything in `docs/` stays public until §7.
2. **2FA** on your GitHub account (and Cloudflare once you make it).
3. Send Mac [handoff-for-mac.md](handoff-for-mac.md) and the §1 list. Optional: send [marketing-plan.md](marketing-plan.md) and [ai-guide.md](ai-guide.md) too; both are written for him.

Do not rebuild in Squarespace. Do not add a CMS. His pace; he works three jobs.

---

## 1. Collect from Mac

Logo, his Web3Forms key and the domain yes/no are the blockers. Photos can ship as a second pass if he's slow.

**Blockers**

- [ ] Logo file (promised). An SVG or a large PNG is best.
- [ ] **His Web3Forms access key**, created with the email he wants signups sent to (steps in §3)
- [ ] Confirm URL: keep **macslittlechef.com** (default) or buy something else
- [ ] Domain access so DNS can move: add Jacob as a **contributor** on Squarespace Domains, or he changes the records himself while Jacob walks him through it. **Don't take his password.** The domain also runs his Google email (MX and SPF are live), so that login can take over his inbox.

**Launch-quality, can follow a week later**

- [ ] 6–10 class photos (cutting boards and hands are fine; no faces needed)
- [ ] **Photo consent** from each family for any photo showing their kid. No faces, no consent needed.
- [ ] 4–6 parent reviews (first name + kid's age), each parent **OK'd being quoted**
- [ ] One-paragraph bio, and whether he's a Registered Dietitian (RD) (changes the wording)
- [ ] Ages, class length, **his town** (local search needs it), price or "contact for pricing"
- [ ] Public contact email for the footer (`contactEmail`), or "none"
- [ ] Optional: Instagram, Facebook, Google Business Profile links (for structured data and the footer)
- [ ] Optional, later: PA clearances / insurance / food-safety status for a trust line ([marketing-plan.md §2](marketing-plan.md#2-do-these-before-pitching-schools-or-towns))

**Mac's account security** (ask on the same call; [security.md](security.md) findings 2–3)

- [ ] 2FA on Squarespace and on his Google email
- [ ] Transfer/registrar lock on `macslittlechef.com` (on by default at Squarespace; confirm)

Put files in `site/images/`. Keep the stand-in photos until real ones exist.

---

## 2. Put his content on the page

Local preview: `python3 -m http.server 5173 --directory site` → http://127.0.0.1:5173

- [ ] **Logo:** swap the header seal (inline SVG in `index.html`) and `favicon.svg`. Make a 180×180 PNG for `apple-touch-icon` (currently a 330 KB stand-in photo).
- [ ] **Photos:** run `scripts/optimize-images.sh <file>` on each, then update the `<img>` tags (details in §8, "New photos"). Hero = 3 photos, gallery = 6.
- [ ] **Share image:** point `og:image` and the structured-data `image` at a real class photo (an absolute URL; JPEG is safest for link previews).
- [ ] **Reviews:** replace the sample quotes and delete the "sample" labels and the section's placeholder sentence.
- [ ] **Copy:** bio, ages, class length, town in the about and classes sections. Delete every "Still needed from Mac" note and the Unsplash credit in the footer. The `preview-only` class hides them, but delete them anyway.
- [ ] **Copy cleanup while you're in there:** "he writes back / follows up himself" appears three times (hero trust line, step 02, class card 03). Give card 03 something about the classes instead, once Mac says what they cook. Also rewrite "Mac started Mac's Little Chefs Academy…" to avoid saying the name twice.
- [ ] Optional: trust line ("Clearances ✓ Insured ✓"), and "Birthday parties" / "For schools & groups" sections if he offers them ($50 content updates, §9).

Check phone and desktop widths. Do **not** set `preview: false` yet.

---

## 3. Wire the form

The form itself is done and verified end to end (2026-11-06, with Jacob's test key, used in the browser only). Mac does **not** need a new form. He needs his own **access key**, which tells Web3Forms which inbox to deliver to.

**Why his key, not Jacob's:** parents' and kids' details go straight to Mac instead of through Jacob's inbox. He can change the destination or see submissions himself, and the form keeps working if Jacob steps back. Don't create it with his email from Jacob's side; he has to receive the key in his own inbox anyway. A call where he does it while Jacob watches is fine.

**Mac (about 2 minutes):**

- Go to [web3forms.com](https://web3forms.com) and enter the email he wants signups sent to. Website field: `https://www.macslittlechef.com/`.
- Web3Forms emails him an access key.
- He texts or emails the key to Jacob. That's safe: the key is public by design and can only send mail to his inbox.
- If Web3Forms offers 2FA on the account, he turns it on.

**Jacob:**

1. Paste Mac's key in `site/js/config.js` → `web3formsKey`. Never commit Jacob's test key.
2. In the Web3Forms dashboard: domain-restrict if the plan allows. The page ships honeypot + `botcheck` only; it does **not** include the hCaptcha widget. If you turn on hCaptcha in the dashboard, also add the widget and the hCaptcha CSP domains (see the comment in `site/_headers`), or every real signup may be rejected.
3. Paste Mac's public email into `contactEmail` (footer link + fallback in the form's error message). Leave `""` if he doesn't want it shown.
4. Send a test signup. Confirm it lands in **Mac's** inbox, not Jacob's (check spam on the first one), and that the "How did you hear" answer comes through. Tell Mac to expect it and that it's safe to delete.
5. Tell Mac: signup emails come from strangers. Reply normally, but **don't click links** in the message field.
6. Commit and push.
7. Leave `preview: true` until the custom domain is on.

Details: [prod.md](prod.md).

---

## 4. Deploy to Cloudflare Pages (repo still public)

GitHub Pages dies if the repo goes private on GitHub Free. Stand up Cloudflare **first**. This doesn't need Mac or the domain, so it can happen now (§0).

1. Make or sign in to the Cloudflare account. **2FA on.**
2. Cloudflare dashboard → Workers & Pages → Create → connect `jacobrozell/LittleChefAcademy`.
3. Limit the GitHub App to **this repo only**.
4. Build command: none. Output directory: **`site`**. Branch: `main`.
5. Open the `*.pages.dev` URL. Confirm it is the brochure, not `docs/spec.md`, and that the draft banner shows.
6. Check the security headers from `site/_headers` are live:
   ```sh
   curl -sI https://<project>.pages.dev/ | grep -iE 'content-security|x-frame|strict-transport|cross-origin-opener'
   ```
7. Optional: Cloudflare Web Analytics → paste the token into `cloudflareBeacon` in `config.js`, push.
8. Send Mac and Paul the `pages.dev` link as the new preview.

Push host: personal git only. Confirm `git remote get-url --push origin` contains `github.com-personal`. Do not use `gh`.

Folder `MacsLittleChefsAcademy` → GitHub `LittleChefAcademy`.

More: [hosting.md](hosting.md).

---

## 5. Point the domain

Default: **macslittlechef.com** (Squarespace registrar; the web records point at Squarespace and 404).

**Careful: the domain also carries Mac's Google email.** MX `smtp.google.com` and SPF `v=spf1 include:_spf.google.com ~all` are live. Change only the **website** records (apex and `www`). Never delete MX or TXT records. If you move the whole DNS zone to Cloudflare nameservers, re-create the MX, SPF and any DKIM records there **before** switching, or his email stops.

1. Add the custom domain on the Cloudflare Pages project (`www.macslittlechef.com`, plus the apex).
2. At Squarespace Domains DNS, follow Cloudflare's records: usually a `www` CNAME to the pages target, and ALIAS/ANAME or A records for the apex, as Cloudflare shows. Remove Squarespace's old website records for apex/`www` only.
3. SSL: let Cloudflare issue the cert. Wait until https://www.macslittlechef.com loads the brochure and the apex redirects to it (or the other way round; pick one).
4. **Email protection** ([security.md](security.md) finding 3):
   - [ ] Mac turns on DKIM signing in Google Admin; add the TXT record it gives.
   - [ ] Add TXT `_dmarc.macslittlechef.com` → `v=DMARC1; p=none; rua=mailto:<mac's email>`. After about 2 weeks of clean reports, change to `p=quarantine`.
   - [ ] Optional: CAA records limiting certificate issuers to the ones Cloudflare uses.
5. Confirm Mac's email still sends and receives after the change.
6. Bot protection (the "included" item in §9): only possible if the zone is on Cloudflare nameservers. Then go to Security → Bots → **Bot Fight Mode** on. If DNS stays at Squarespace, Cloudflare Pages' built-in protection is what you get, which is fine for this site.
7. Only buy a different domain if Mac asks. Do not buy `LittleChefAcademy.com` "just in case."

---

## 6. Release (go live)

In `site/js/config.js`:

- `preview: false`: hides draft banners and notes
- `web3formsKey` (§3), `contactEmail` (§3), `cloudflareBeacon` (§4, optional) already in

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
- [ ] Structured data (`application/ld+json` in `index.html`): add Mac's town as `address` (`addressLocality`, `addressRegion: "PA"`), plus `telephone` / `email` / `sameAs` (Instagram, Facebook, Google Business Profile) if he has them. Change `areaServed` to his county or town list.
- [ ] Put his town in the `<title>`, meta description and hero eyebrow (local search).
- [ ] Re-read Web3Forms' data-retention terms against `privacy.html`; adjust if they keep copies.

Then:

1. Push `main` (personal remote). Cloudflare deploys.
2. Click through on a real phone and a desktop: home, nav, mobile menu, privacy page, 404 (any made-up URL).
3. Send one real test signup through the live site; confirm it reaches Mac.
4. Check headers on the real domain (same `curl` as §4, against `https://www.macslittlechef.com/`).
5. Google's [Rich Results Test](https://search.google.com/test/rich-results) on the live URL; fix any errors in the structured data.
6. Google Search Console: verify the domain, submit the sitemap.
7. Paste the link into iMessage or Facebook to check the share preview (title, description, photo).
8. Tell Mac / Paul the live URL.

### First month after launch

- [ ] Mac sets up a **Google Business Profile** (service area, hides his home address) and links the site. Add its URL to `sameAs`.
- [ ] Search Console: page indexed? Any errors?
- [ ] DMARC reports clean → move to `p=quarantine` (§5).
- [ ] Ask the first new families for reviews; swap them in (§8).
- [ ] Mac starts the tracking sheet; the form's "How did you hear" answers feed it ([marketing-plan.md §7](marketing-plan.md#7-what-to-track)).

---

## 7. Private the GitHub repo

Only after §4 is green (`pages.dev` serving the site). The custom domain can come later.

1. GitHub repo Settings → Change visibility → **Private**.
2. Confirm `*.pages.dev` (and the custom domain, if on) still work. Cloudflare keeps repo access.
3. Disable GitHub Pages and delete `.github/workflows/pages.yml`.
4. The spec, texts, money notes, marketing plan and audit are no longer on the public internet. The **website** stays public.
5. Remember: anyone who cloned or forked while it was public still has the history. Nothing in it is a secret (no keys or passwords), just private notes.

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
| New photos | Drop originals in `site/images/`, run `scripts/optimize-images.sh <file>` (makes `-640.webp` / `-1280.webp`), then update that `<img>`'s `src`, `srcset` (use the real widths it prints), `width`/`height`. Hero photos keep `fetchpriority="high"`; gallery photos keep `loading="lazy"`. Kids' faces only with photo consent. | 15–30 min |
| New review | Edit the reviews block in `index.html` (parent OK'd the quote) | 10 min |
| Copy / hours / town | Edit the about / classes sections; town also in title, meta and structured data | 10–20 min |
| Logo tweak | Swap header SVG + `favicon.svg` + apple-touch-icon | 15 min |
| Form broken | Web3Forms dashboard + one test submit | 15 min |
| Domain / HTTPS | Cloudflare + registrar DNS (never touch MX/TXT) | 15–45 min |
| New section (parties, schools) | Copy an existing section's markup; add a nav link if it's major | 30–60 min |

A few times a year, unprompted: send one test signup, glance at Cloudflare, check the domain cert, and run the `curl` header check from §4.

---

## 9. Price (what to tell Paul / Mac)

The build is mostly done. Hosting is free. He already pays for the domain at Squarespace.

### Quote

| Item | Fair range | What's in it |
|---|---|---|
| **Launch** | **$400–$800** (clean number: **$500**) | His content on the page, live `macslittlechef.com`, working form to his email, Cloudflare, captcha/honeypot, privacy page. Stranger quote $800–$2,000. $3k+ is too much. |
| Hosting | **$0** | Cloudflare Pages. |
| Domain | **~$12–20/yr** | He already has `macslittlechef.com`. |
| Form (now) | **$0** | Web3Forms free, 250 signups/mo. |
| **Watch** | **$50 per content update**, or **$250/yr** | Year covers uptime, HTTPS, photo/review/copy swaps, periodic checkup. Per-update is $50 each time he sends a batch. |

Launch does **not** include: payments, class calendar, student accounts, a CMS he logs into, or rebuilding in Squarespace.

Technical what-ifs: [scaling.md](scaling.md). Say the next block out loud so it isn't a surprise later.

### What to tell Mac about later

Say this in a voice chat, then follow up in text. Numbers are pass-through tools + your time, not a new "website rebuild."

**The site itself will not fall over from traffic.** It's a simple page on Cloudflare. If random internet junk or an AI crawler hammers the address, that's absorbed for free. You turn on their bot protection at launch (included). You'd only look at paying Cloudflare ~$25/mo if it got ugly *and* real parents were getting blocked — unlikely, and you'd ask him first.

**Spam in the signup form** (fake messages, bots): launch already has a captcha. If his inbox still gets junk, next steps are tightening the form (often ~$12/mo for the form tool) or, if it's still bad, a small extra filter in front of the form (**~$150–$300 once**). Included in watch: noticing it and turning the form off if it's a flood. Not included: building that extra filter until it's actually happening.

**A lot of real signups:** free form tool caps at **250/month**. If he's heading toward that, you warn him. At **~500/month** the form tool is about **$12/mo** (he pays that, or it's billed through you at cost). That's the easy part. The hard part is **him**: 500 emails is ~16 a day. The brochure cannot answer those for him. Then you'd talk about a spreadsheet + auto-reply (small, on the watch fee or a few hours) or a real calendar/waitlist (**new project, new quote** — not this $500 site).

**If the class becomes a real operation** (payments, schedules, hundreds of families): that's a different product. You'd estimate it separately. This site stays the public page.

### What's included vs extra

| Scenario | Included in watch / launch? | If it happens, money |
|---|---|---|
| Normal photos / copy / "is it up?" | Yes on the **$250/yr** plan; else **$50** per content update | — |
| Internet DDoS / AI crawlers hitting the page | Yes — Cloudflare, $0, you glance | CF Pro **~$25/mo** only if you both agree it's needed |
| Form junk, you flip captcha / pause the form | Yes (watch) | — |
| Form junk that needs the paid form plan or domain lock | You do the click; **tool is pass-through** | Web3Forms Pro **~$12/mo** |
| Form junk that needs a custom filter (Worker) | No — new small job | **~$150–$300 once** |
| Approaching 250 real signups/mo | Yes — you warn him | — |
| 500 real signups/mo | You upgrade the form tool | **~$12/mo** tool + talk about his inbox |
| Spreadsheet + "Mac will email you" auto-reply | Small, can sit on watch or a few hours | **$0–$150** |
| Calendar, payments, waitlist portal | No | **New estimate** (hours × rate, not this brochure) |

Don't pre-charge him for Pro tools or the Worker. Don't hide that 250/mo is a ceiling.

Client-facing writeup (send this, not this runbook): [handoff-for-mac.md](handoff-for-mac.md).

### Pasteable note (Paul / Mac)

You can send this as-is:

> The site is a simple page. Traffic and random internet attacks sit on Cloudflare and don't cost extra. Signups go to your email; the free form allows 250 a month, which is plenty until classes are slammed. If you ever get near that, the paid form is about $12/month and we'd talk — 500 real signups a month is more a "you need a waitlist or a calendar" problem than a website problem. If bots spam the form, we've already got a captcha; if that isn't enough we'd tighten it, and only charge extra if we have to build a custom filter. After launch, keeping it going is $50 per content update or $250 a year. Bigger stuff like online payments or booking is a separate project if you ever want it.

---

## 10. Stop / don't

- Don't private GitHub before Cloudflare is serving the site (§4 → §7)
- Don't use `gh` (this machine is logged in as work)
- Don't push as `jrozellOCV`
- Don't take Mac's Squarespace or email password; use contributor access
- Don't delete or change MX / TXT records when pointing the domain (his email lives there)
- Don't commit a test Web3Forms key; only Mac's goes in `config.js`
- Don't turn on hCaptcha in the Web3Forms dashboard without adding the widget + CSP domains
- Don't rely on `preview: false` to allow indexing; edit robots by hand (§6)
- Don't post photos of kids' faces without the family's consent
- Don't buy a second domain unless he asks
- Don't rebuild in Squarespace unless he decides he wants to edit it himself
- Don't add GA4, WordPress, or a CMS
- Don't publish `docs/`, only `site/`
