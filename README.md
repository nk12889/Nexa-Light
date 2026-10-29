# NexaLight website (nexalight.in)

Source of the live site hosted on Hostinger (`u801669679`, `public_html` of nexalight.in),
copied from the server so it can be edited and versioned in Git.

## Structure

| Path | What it is |
| --- | --- |
| `index.html` | The whole public site: a single-page app (Tailwind CDN, GSAP, Lenis) with client-side routes `/`, `/products`, `/product/<id>`, `/gallery`, `/blog`, `/about`, `/contact` |
| `.htaccess` | Rewrites every unknown path to `index.html` so the client-side routes work |
| `admin/` | Admin panel (`/admin/`) for products, categories, gallery, blogs, SEO and settings, stored in Firebase Firestore |
| `api/*.php` | Image upload / delete / import-from-URL endpoints writing to `uploads/` |
| `js/license-check.js` | Locks the site when Firestore `config/license.active` is `false` |
| `js/seo-manager.js` | Loads page/product meta tags from Firestore |
| `firebase-init.example.js` | Template for `firebase-init.js` (Firebase config, kept out of Git) |
| `fix_product_view.js`, `temp_fix.js`, `apply-upload.js`, `update-admin.js` | Old one-off Node scripts that patched `index.html` / `admin/admin.js`; not loaded by the site |

## Not in this repo yet

- **Images** (`images/`, `assets/images/`, ~10 files, ~8 MB) — binary files can't be exported through
  the Hostinger API used here. Download them from hPanel File Manager (or FTP) and commit them.
- **`uploads/`** — admin-uploaded product/gallery/blog photos (~220 files). They are managed by the
  admin panel on the server and ignored by Git.
- **`firebase-init.js`** — create it from `firebase-init.example.js` with the config from the Firebase console.
- `stitch_lumina_lighting_admin_panel/` — design mockups on the server, not used by the site.

## Run locally

```bash
cp firebase-init.example.js firebase-init.js   # then fill in the config
php -S localhost:8000                          # PHP needed for /api; routing via .htaccess won't apply
```

Open http://localhost:8000/ (deep links like `/products` need Apache's `.htaccess`, so start from `/`).

## Deploying to Hostinger

Upload changed files to `public_html` (File Manager / FTP), or connect this repo in hPanel → Git.
Before enabling Git deploys make sure the deploy does not delete `firebase-init.js`, `uploads/`
and the images on the server, since they are not in the repo.
