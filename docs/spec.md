# Mac's Little Chefs Academy — spec

**Status:** preview on GitHub Pages  
**Last updated:** 2026-11-06  
**Preview:** https://jacobrozell.github.io/MacsLittleChefsAcademy/  
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

Read “diuretics” as **dietetics**. He wrote “mckelveys” / “macs”; treat as **McKelvey's Nutrition Services** and **Mac's Little Chefs Academy**.

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
- Domain (does he have one?)
- Brand (logo, colors) or start from a template
- Whether Jacob builds it or this is only a quote he can pass on

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
| Kid name / age | yes |
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

- Point the public domain at the **academy**, not the LLC. Ask him which he wants; likely `macslittlechefs.com` or `macslittlechefsacademy.com`. `mckelveysnutrition.com` can redirect later if he needs it for the LLC.
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

**Default: Squarespace Basic, one page with sections, built-in form to his email.**

He can swap a photo after he moves without texting Jacob. Hosting, SSL, and forms are one login. Matches Mini Chef / Silly Spoons more than a custom app.

**If budget is the objection:** Carrd Pro for $19/year, same sections, upgrade later.

**Custom Astro/Next only if** Jacob wants the build and will take “can you add this photo” texts.

---

## 11. What he needs before anyone starts

- 6–10 class photos
- 4–6 short parent reviews (name + kid age)
- 1 paragraph about him
- Class details: ages, length, where in PA, price or “contact for pricing”
- Email for signups
- Domain preference (`macslittlechefs.com` vs `macslittlechefsacademy.com`, or he already owns one)
- Logo / colors if they exist; otherwise template + academy name

---

## 12. Open questions

1. Is this a quote only, or will Jacob build it?
2. Squarespace vs Carrd vs custom — pick before collecting assets?
3. Does he already have a domain / Instagram / Google Business Profile (academy vs LLC)?
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
