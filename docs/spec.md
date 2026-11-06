# Mac's Little Chefs Academy — spec

**Status:** waiting on Mac; move host to Cloudflare Pages before making GitHub private  
**Last updated:** 2026-11-06  
**Preview:** https://jacobrozell.github.io/LittleChefAcademy/  
**GitHub:** [`jacobrozell/LittleChefAcademy`](https://github.com/jacobrozell/LittleChefAcademy)  
**Working folder:** `~/Desktop/personal/sites/MacsLittleChefsAcademy`  
**Public brand:** Mac's Little Chefs Academy  
**Legal entity:** McKelvey's Nutrition Services LLC

---

## 1. Source material

Texts from the friend of the client (the only brief so far):

> He started his own business teaching kids how to cook nutritional food since he has a doctorate in nutrition and diuretics

> I think he just wanted one that shows like reviews and the ability to sign up honestly

> Yea I think he would just need like people to sign up and it goes to his email and he can reach out in his free time other then that just pics and reviews that look professional.

> If you could see what that would take and how hard that would be and give a estimate that would be super sick he would be very appreciative

> Yea he already holds classes for the kids and is making money he just doesn’t have a website and moved to PA so doesn’t know anybody that makes em

> My llc is mckelveys nutrition services. But under that umbrella i have macs little chefs academy

Texts 2026-11-06, Jacob (blue) ↔ Paul after sending the GitHub Pages preview:

> Send that over to him and lmk when and we can voice chat or meetup and iron the rest out. If he knows what he wants the URL to be I can go ahead and buy the domain and switch it over to that URL. Like LittleChefAcademy.com or Mac'sChefAcademy.com or whatever he wants

> The signup part will take a bit more work

> I already sent it over to him so once he hits me back I gotchu big dawg it may be later tonight when he's off work he works 3 jobs lol

> Damn 3? No worries though I got a decent bit going on this weekend but can find some time soon beginning of next week

> No problem bro that definitely gives him Time to iron shit out himself

> Anything and everything he wants should be doable though

> It looks like maybe he made "https://www.macslittlechef.com/" on Squarespace. I can point my site to that domain but he will have to do some stuff on the Squarespace side. Or I can do it for him if he adds me to that account as a developer.

> And what email does he want for the signup form

> Feel free to give him my number and shit I do not mind at all. But this shouldn't be too hard at all fr

> Or he could send me the Squarespace login and he can just change the password after the site is live

> He said he absolutely loves it and he's going to send you a logo he made for the business and I'll let yall hash out the details he is excited tho might be tonight or tomorrow when he hits you back

> Tell him no rush; we can go at his pace.

> Last thing: How often would he be updating the website? Like would he want new photos and updates weekly, monthly, bi-yearly, whenever he wants, or not planning to update it much once it serves its purpose. This will help determine best move for hosting

> I don't think he'd ever really update it tbh lol once he sends some pics and it's done I think he'd just pay you for watching it lol

Read “diuretics” as **dietetics**. He wrote “mckelveys” / “macs”; treat as **McKelvey's Nutrition Services** and **Mac's Little Chefs Academy**. Go-between is **Paul**. Client is **Mac**; evenings after three jobs.

---

## 2. What we know

| Fact | Source |
|---|---|
| Solo operator, already teaching and getting paid | texts |
| Kids cooking classes with a nutrition focus | texts |
| Credentials: doctorate in nutrition / dietetics | texts |
| Recently moved to Pennsylvania; no local web person | texts |
| Wants a professional-looking site | texts |
| Signups should email him; he follows up when free | texts |
| Photos + reviews are the other two must-haves | texts |
| LLC: McKelvey's Nutrition Services | his text |
| Consumer brand: Mac's Little Chefs Academy (under the LLC) | his text |
| Mac loved the GitHub Pages preview | Paul, 2026-11-06 |
| He made a logo and will send it | Paul, 2026-11-06 |
| Works three jobs; replies nights / weekends | Paul |
| Already registered macslittlechef.com (Squarespace, empty) | whois + Jacob |
| Jacob offered voice/meetup next week, his number, or Squarespace collaborator / login | Jacob → Paul |
| Unlikely to update after initial photos; would pay Jacob to watch the site | Paul, 2026-11-06 |

He is not asking for a marketplace, student accounts, or live booking. The site is a brochure plus an inbox.

**Branding:** the website is **Mac's Little Chefs Academy**. Parents search for kids cooking, not an LLC. McKelvey's Nutrition Services belongs in the footer (and invoices), e.g. “A program of McKelvey's Nutrition Services LLC.” Do not lead the homepage with the legal name.

---

## 3. Unknowns

Blockers for a real build (nice for an estimate, required before launch):

- His name (brand suggests “Mac”; legal first name unknown)
- Where in PA (city / studio / in-home / schools)
- Ages, class length, price or “contact for pricing”
- Photos (need ~6–10 class shots)
- Reviews (need ~4–6 parent quotes; name + kid age is enough)
- Email for the form
- Squarespace login for `macslittlechef.com` (to point DNS at the live site)
- Logo file (promised; not received yet)
- Whether he keeps `macslittlechef.com` or wants a new URL (`LittleChefAcademy.com` / other)

---

## 4. Goals and non-goals

**v1 goals**

- Look like a real local kids’ class, not a Facebook page
- Show who he is (nutrition doctorate) and what the classes are
- Show photos of kids cooking
- Show parent reviews
- Let a parent submit interest; that submission hits his email
- He can update photos/reviews later without a developer on call (strong preference)

**v1 non-goals**

- Online payments
- Account logins / student portal
- Live class calendar or ticket checkout
- Blog / recipes (nice later)
- SEO content mill
- App

Those show up on bigger comps (Sticky Fingers, Young Chefs Academy). Out of scope until he asks.

---

## 5. Site shape

One scrolling page is enough. Optional extra URLs later (About, Classes) if the builder is multi-page.

Suggested sections:

1. **Hero** — photo, Mac's Little Chefs Academy, one-line pitch, “Inquire” button
2. **Who it’s for** — ages, nutrition + cooking, PA area
3. **About** — doctorate, why kids, short bio; LLC only if it helps credentials
4. **Classes** — format, length, what they cook; price or “reach out”
5. **Reviews** — 4–8 quotes
6. **Photos** — grid
7. **Sign up** — form → email
8. **Footer** — email, area, maybe Instagram, “Mac's Little Chefs Academy is a program of McKelvey's Nutrition Services LLC”

### Form fields

Keep it short so parents actually send it:

| Field | Required |
|---|---|
| Parent name | yes |
| Email | yes |
| Phone | no |
| Kid first name / age | yes |
| How did you hear about Mac? (dropdown; “Other” reveals a write-in, sent as `Other: …`) | no |
| Message / what they’re looking for | no |

Confirmation: “Thanks — he’ll email you.” No account, no auto-reply sequence required.

---

## 6. Example sites

Right-sized (small operator, photos, reviews, contact):

| Site | Why it matters | Stack (observed) |
|---|---|---|
| [Mini Chef Academy](https://www.minichefacademy.com/) | Philly kids cooking; mission, testimonials, email. Closest match. | Wix |
| [Silly Spoons](https://www.sillyspoons.com/) | Warrington, PA. Reviews on the homepage, location, text/email. Almost the brief. | simple brochure |
| [Junior Chefs Kitchen](https://juniorchefskitchen.com/) | Nutrition-forward classes, gallery, testimonials. Visual target; slightly bigger. | Webflow |
| [Ash Chase Culinary](https://ashchaseculinary.com/) | Doylestown, PA. Classes + contact. More “buy tickets” than we need. | unknown |

Too big (skip as a build target):

- [Sticky Fingers Cooking](https://stickyfingerscooking.com/) — national, school enrollment software
- [Common Threads](https://www.commonthreads.org/programs/) — nonprofit programs
- [Young Chefs Academy Yardley](http://yardleypa.youngchefsacademy.com/) — franchise template

---

## 7. Difficulty

Easy. The site is a template + content problem, not an engineering problem.

- Build, if content is ready: **6–12 hours** (Carrd closer to 2–4)
- His homework (photos, reviews, bio): **a few evenings**
- Calendar booking or payments later: new project

---

## 8. Stack and hosting options

The real fork: **he edits it after launch** vs **Jacob owns updates**.

### If Mac wants to add photos himself

What they liked is a static page in git. Mac cannot open that and drop in a JPEG. Three honest paths:

| Path | What Mac does | What Jacob does after launch | Cost | Notes |
|---|---|---|---|---|
| **A. Squarespace (rebuild our layout there)** | Logs in, uploads photos, edits a review, done | Almost nothing | ~$20/mo he may already be paying | Domain already on Squarespace and 404s. Closest to “his site.” Form is built in. Look will be ~90% of the preview, not identical. |
| **B. Keep GitHub Pages, Jacob is the CMS** | Texts/emails photos | 15 minutes to add them and push | $0 hosting | Fine if photos change a few times a year. Bad if he wants to tweak it every Sunday. |
| **C. Custom site + a real CMS** | Uses a CMS admin (Sanity, Tina, Decap) | Build and babysit the CMS | Extra setup + maybe $0–15/mo | Overkill for a brochure. He’d still need an account and a login that isn’t git. Don’t do this unless A and B both fail. |

Do **not** pretend a `content.json` or GitHub repo is “easy for Mac.” He works three jobs. That’s Jacob’s editor, not his.

**Recommendation (updated after Paul):** path B, but **not** on GitHub Pages long-term. He will not use a CMS. Jacob is the maintainer. Host on **Cloudflare Pages** from a **private** `LittleChefAcademy` repo. See [hosting.md](hosting.md).

WordPress, Wix (he’s already on Squarespace’s domain), and Decap-on-GitHub are worse fits.

| Option | Look | He can edit photos/reviews? | Hosting | Ongoing cost | Time to ship | Notes |
|---|---|---|---|---|---|---|
| **Squarespace** | Professional studio/restaurant templates | Yes | Included (SSL, CDN) | ~$20/mo + domain | 4–8 hrs | Best default. Built-in forms email him. |
| **Wix** | Fine; Mini Chef uses it | Yes | Included | ~$18–30/mo | 4–8 hrs | More widgets, usually looks a bit cheaper than Squarespace. |
| **Carrd Pro** | Clean one-pager | Somewhat | Included | **$19/year** | 2–4 hrs | Cheapest credible v1. Tight if he wants separate pages later. |
| **Framer** | Most “designed” | Weak | Included | ~$10–15/mo | 6–10 hrs | Pretty; he will ping Jacob to change copy. |
| **Custom (Astro or Next) + Vercel or Cloudflare Pages** | As good as we make it | No, unless we add a CMS | Free tier | Domain ~$15/yr + form ~$0–10/mo | 8–16 hrs | Fine if Jacob maintains it. Portfolio piece. |
| **Webflow** | Junior Chefs look | Medium | Included | ~$15–25/mo | 8–12 hrs | Overkill for this brief. |
| **WordPress** | Theme-dependent | Sort of | You buy hosting | $5–15/mo + plugins | more | Skip. Updates/security for a brochure site. |

### Forms on a custom site

No backend needed. Use Web3Forms, Formspree, or Basin: form POST → email. Google Forms embed works but looks like Google Forms.

### Domain and email

- **He already has a domain.** `macslittlechef.com` (singular *chef*) was registered 2026-04-07 at Squarespace Domains, registrant org “Mac's Little Chefs Academy”, PA. Nameservers are Google Domains (`ns-cloud-e*.googledomains.com`). Apex + `www` currently point at Squarespace and return a Squarespace **404** — domain is connected, no published site.
- Do not buy `macslittlechefs.com` unless he wants the plural as a redirect. Point the public site at **macslittlechef.com**.
- Domain: ~$12–15/yr (Cloudflare, Squarespace, Namecheap)
- Builders **are** the host — no VPS
- Custom: Vercel or Cloudflare Pages, HTTPS automatic, this traffic is free-tier
- Optional: Google Workspace `hello@macslittlechefs.com` (~$7/mo). Not required; Gmail on the form is fine for v1

Search (Nov 2026): no US site for this academy. Ireland has an unrelated [Little Chefs Academy](https://www.littlechefsacademy.eu/). US search for McKelvey + kids cooking currently hits **Young Chefs Academy** franchisees in Texas (Chris and Elizabeth McKelvey) — different business. A real site is how parents find *this* Mac.

---

## 9. Money

| Path | Upfront | Ongoing |
|---|---|---|
| Squarespace / Wix, friend sets it up | $0–$400 labor | ~$20/mo + domain |
| Carrd, friend sets it up | $0–$200 labor | $19/yr + domain |
| Freelancer, simple custom | **$800–$2,000** typical | domain + cheap hosting |
| Friend/indie rate (Jacob) | **$400–$800** is fair | same as chosen host |
| Stranger quoting $3k–$5k for this | overcharging | — |

A line he can hear: **about $500–$1,000 and 1–2 weeks**, then ~$20/month (or ~$20/year on Carrd).

---

## 10. Recommendation

**Ship the custom one-pager Jacob already built.** Mac will not edit it. Do not rebuild in Squarespace unless he changes his mind.

**Host on Cloudflare Pages** (private GitHub repo → public site). Do not stay on GitHub Pages: private repo on GitHub Free turns Pages off, and this repo’s spec should not stay public.

**Domain:** keep `macslittlechef.com` unless he asks for another. **Form:** Web3Forms to his email. **Analytics:** Cloudflare Web Analytics only, no GA4.

---

## 11. What he needs before anyone starts

- 6–10 class photos
- 4–6 short parent reviews (name + kid age)
- 1 paragraph about him
- Class details: ages, length, where in PA, price or “contact for pricing”
- Email for signups
- Domain preference (`macslittlechefs.com` vs `macslittlechefsacademy.com`, or he already owns one)
- Logo (incoming from Mac)
- Email for signups
- Keep `macslittlechef.com` vs buy something else
- Squarespace access: add Jacob as developer, send login, or he changes DNS himself

---

## 12. Open questions

1. Jacob is building it. Remaining is domain + form, at Mac’s pace.
2. Custom GitHub Pages is the site they liked. Squarespace is only where the domain currently lives.
3. Keep `macslittlechef.com` vs buy a new URL? Email for the form? Squarespace collaborator vs DNS DIY?
4. In-home, rented kitchen, or school enrichment? Changes photos and copy.
5. Any need for birthday parties (Silly Spoons / Junior Chefs both sell those)? Not in the texts.
6. Confirm spelling: Mac's vs Macs, McKelvey's vs McKelveys.

---

## 13. Decision log

| Date | Decision |
|---|---|
| 2026-11-05 | Scope from texts: photos, reviews, email signup. No payments/logins. |
| 2026-11-05 | Working dir started as `sites/KidsCooking`. Name TBD. |
| 2026-11-05 | Lean Squarespace unless he can’t spend ~$20/mo or Jacob wants to code it. |
| 2026-11-06 | Public brand: Mac's Little Chefs Academy. LLC: McKelvey's Nutrition Services. Folder renamed to `sites/MacsLittleChefsAcademy`. Site leads with the academy; LLC in the footer. |
| 2026-11-06 | Start building a custom static one-pager in `site/` (Mac's branding). Can ship this or use it as the Squarespace layout. Form waits on a Web3Forms key + his email. |
| 2026-11-06 | Polish + host preview on jacobrozell GitHub Pages. Public URL for Mac to look at. Spec stays out of the published `site/` folder. |
| 2026-11-06 | GitHub repo is `jacobrozell/LittleChefAcademy`. Pages URL: https://jacobrozell.github.io/LittleChefAcademy/ |
| 2026-11-06 | Mac already owns `macslittlechef.com` (Squarespace, empty 404). Do not buy a new domain unless he asks. Remaining launch: custom domain on GitHub Pages + Web3Forms to his email. |
| 2026-11-06 | Paul: Mac loves it, sending a logo, will hit Jacob tonight or tomorrow. No rush. Wait for Mac (email, domain choice, Squarespace access, logo). |
| 2026-11-06 | Editability: if Mac wants to add photos himself → rebuild in Squarespace (domain already there). If he’ll send photos to Jacob → keep GitHub Pages. Don’t bolt a CMS onto this brochure. |
| 2026-11-06 | Paul: he probably never updates after initial pics; would pay Jacob to watch it. Lean in-house GitHub Pages over Squarespace. |
| 2026-11-06 | Prod hardening: CSP/referrer, form allowlist + honeypot, privacy page, Cloudflare Web Analytics hook (off). See `docs/prod.md`. |
| 2026-11-06 | Leave GitHub Pages. Long-term host: Cloudflare Pages from a private repo. Private GitHub only after CF is serving. Spec is currently public — another reason to private. |
| 2026-11-06 | Runbook: `docs/runbook.md` is the order of operations from waiting on Mac through launch, updates, and price. |
| 2026-11-06 | Scaling plans in `docs/scaling.md`: CF handles page DDoS; 500 signups → Web3Forms Pro + Mac’s inbox; form API abuse → captcha/domain lock then optional Worker. |
| 2026-11-06 | Runbook §9: tell Mac DDoS is included/$0, 250 signup cap, $12/mo form Pro at ~500, Worker only if spam, calendar/payments are a new quote. Pasteable note in the runbook. |
| 2026-11-06 | Client handoff: `docs/handoff-for-mac.md` — non-technical, product + long-term + price. Send that, not the runbook. |
| 2026-11-06 | Marketing: `docs/marketing-plan.md` + `docs/ai-guide.md` (both shareable with Mac). Form gains optional “How did you hear about Mac?” dropdown for attribution. LocalBusiness JSON-LD added; town/contact filled at launch. |
| 2026-11-06 | Audit: CSPs aligned + least privilege (meta and `_headers` are both enforced), `object-src 'none'`, HSTS without `preload`. Fixed mobile menu never hiding (`.mobile-nav` display beat `[hidden]`). Indexing flip moved from JS to a manual launch step (runbook §6). `contactEmail` config for footer + error fallback. |
| 2026-11-06 | Security audit: `docs/security.md`. Biggest risks are the public repo, account 2FA (Squarespace also runs Mac’s Google mail) and no DMARC on the domain. Don’t take Mac’s password; use contributor access. |
| 2026-11-06 | Form verified end to end from localhost with Jacob’s test Web3Forms key (kept in memory only, never committed): Web3Forms returned success and the email arrived. Mac’s own key goes in `config.js` at launch. |

---

## 14. Remaining to launch

Full checklist, deploy order, and price: **[runbook.md](runbook.md)**.

The page is done enough. Pause until Mac replies. Agent order after that:

1. **Cloudflare Pages** on `site/` while the GitHub repo is still public, confirm `*.pages.dev`. Then **private the GitHub repo**, then disable GitHub Pages. Do not private first. [hosting.md](hosting.md)
2. **Logo** — header/favicon in place of the seal.
3. **Domain** — default `macslittlechef.com`. Point DNS at Cloudflare Pages, not GitHub. Only buy a new URL if he asks.
4. **Signup** — Web3Forms key on Mac’s email in `site/js/config.js`, `preview: false`, test one submit.
5. **Photos / reviews / bio / PA town** when he sends them.

His pace. Next agent: start at [docs/README.md](README.md).
