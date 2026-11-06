# Mac's Little Chefs Academy

Client brochure site. **Not** a Jacob consumer app. No App Store, no Firebase, no review lanes unless asked.

- **Folder:** `sites/MacsLittleChefsAcademy`
- **GitHub:** `jacobrozell/LittleChefAcademy` (name differs)
- **Public site today:** https://jacobrozell.github.io/LittleChefAcademy/ (GitHub Pages; goes away if the repo is private)
- **Long-term host:** Cloudflare Pages from the private repo. Publish `site/` only. See `docs/hosting.md`.
- **Preview:** `python3 -m http.server 5173 --directory site`
- **Config:** `site/js/config.js` (`preview`, `web3formsKey`, `cloudflareBeacon`)
- **Do not** publish `docs/` or this file. Do not use `gh` (work login). Do not buy a domain unless Mac asks — he already has `macslittlechef.com`.
- **Do not** add GA4 or a CMS. Mac will not edit the site; Jacob drops in photos.

Read `docs/runbook.md` first. Scale/DDoS/form floods: `docs/scaling.md` (don’t pre-build). Then spec / hosting / prod before changing stack, DNS, or the form.
