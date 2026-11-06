# Hosting

The live preview is GitHub Pages. That dies if `jacobrozell/LittleChefAcademy` goes **private** on GitHub Free (Pages needs a public repo, or GitHub Pro). The spec, texts, and money notes are in this repo — **private is the right call.** Do not keep the repo public to save Pages.

The **website** stays public. Only the git repo goes private.

## Recommendation

**Cloudflare Pages**, project output directory `site`, no build command. Connect the GitHub repo (Cloudflare GitHub App, this repo only). Then private GitHub, then turn off GitHub Pages.

Why this one:

- Free, private GitHub repos are first-class
- Jacob already uses Cloudflare (ConcertBuddy R2)
- `site/_headers` actually applies (GitHub Pages ignores it)
- Cookie-less Web Analytics, custom domain, HTTPS
- Same git push workflow Jacob already has
- Matches “Jacob watches the site, Mac never logs in”

## Comparison

| Host | Private GitHub on free tier | Custom domain + HTTPS | Headers / WAF | Analytics | Notes |
|---|---|---|---|---|---|
| **Cloudflare Pages** | Yes | Yes | `_headers` + CF | CF Web Analytics | **Do this.** |
| Netlify | Yes | Yes | `_headers` | Basic | Fine. Built-in forms could replace Web3Forms (100/mo free). Extra account. |
| Vercel | Yes | Yes | limited | Vercel analytics | Hobby ToS is awkward for a client site. Overkill. |
| GitHub Pages | **No** (Free) | Yes | No | No | Current preview only. |
| GitHub Pro + Pages | Yes | Yes | No | No | Still no headers/logs. Paying GitHub to stay on a worse host. |
| S3 + CloudFront | n/a | Yes | Yes | extra | Ops for a one-pager. |
| Squarespace | n/a | Already on his domain | theirs | theirs | Rebuild. Only if Mac wants to edit himself (he doesn’t). |
| VPS / Docker | n/a | DIY | DIY | DIY | No. |

Do not stand up WordPress, a CMS, or a container for this.

## Move off Pages (order matters)

If you private the GitHub repo **before** Cloudflare is serving the site, the preview URL 404s.

1. Cloudflare dashboard → Workers & Pages → Create → connect `jacobrozell/LittleChefAcademy`.
2. Build: empty / none. Output directory: `site`. Production branch: `main`.
3. Confirm `*.pages.dev` shows the brochure (not the spec).
4. **Then** make the GitHub repo private. This doesn't need to wait for launch: `pages.dev` becomes the preview link (runbook §0, §7).
5. Delete or disable the GitHub Pages environment / `.github/workflows/pages.yml`.
6. Later, at launch: custom domain `macslittlechef.com` (runbook §5; careful with his email records), keys in `config.js`, `preview: false` (runbook §6).

Cloudflare’s GitHub App should be limited to this one private repo, not all of jacobrozell.

## What stays the same

- Static files in `site/`
- Form → Web3Forms → Mac’s email
- Jacob edits photos in git and pushes
- No Squarespace site unless Mac changes his mind about editing
