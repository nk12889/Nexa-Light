# NexaLight website (nexalight.in)

Source of the live site hosted on Hostinger (`u801669679`, `public_html` of nexalight.in),
copied from the server so it can be edited and versioned in Git.

## Structure

| Path | What it is |
| --- | --- |
| `index.html` | The whole public site: a single-page app (Tailwind CDN, GSAP, Lenis) with client-side routes `/`, `/products`, `/product/<id>`, `/gallery`, `/blog`, `/about`, `/contact` |
| `.htaccess` | Rewrites every unknown path to `index.html` so the client-side routes work |
| `admin/` | Admin panel (`/admin/`) for products, categories, gallery, blogs, SEO and settings |
| `api/*.php` | Image upload / delete / import-from-URL endpoints writing to `uploads/` |
| `supabase-init.js` | Supabase client plus Firestore-style helpers (`collection`, `doc`, `getDocs`, `setDoc`, `onSnapshot`, …) and admin sign-in |
| `supabase/migrations/` | Database schema and access rules |
| `js/license-check.js` | Locks the site when the original Firebase project's `config/license.active` is `false` (still on Firebase) |
| `js/seo-manager.js` | Loads page/product meta tags from the database |
| `fix_product_view.js`, `temp_fix.js`, `apply-upload.js`, `update-admin.js` | Old one-off Node scripts that patched `index.html` / `admin/admin.js`; not loaded by the site |

## Not in this repo yet

- **Images** (`images/`, `assets/images/`, ~10 files, ~8 MB) — binary files can't be exported through
  the Hostinger API used here. Download them from hPanel File Manager (or FTP) and commit them.
- **`uploads/`** — admin-uploaded product/gallery/blog photos (~220 files). They are managed by the
  admin panel on the server and ignored by Git.
- `stitch_lumina_lighting_admin_panel/` — design mockups on the server, not used by the site.

## Database (Supabase)

Content lives in the Supabase project **nexalight** (`rgqcfplwuxmdpvnioapg`, Mumbai), organization
Yash Lighting Solutions. It was migrated from the Firebase project `nexa-83944`.

- Table `public.documents` holds one row per item: `collection` (`products`, `categories`, `gallery`,
  `blogs`, `seo_settings`, `settings`), `id`, and the fields as `data` (jsonb).
- Everyone can read; only users listed in `public.admin_users` can add, edit or delete.
- The public site gets live updates through Supabase Realtime.

### Adding an admin

1. Supabase dashboard → Authentication → Users → **Add user** (email + password, auto-confirm).
2. SQL editor:
   ```sql
   insert into public.admin_users (user_id)
   select id from auth.users where email = 'you@example.com';
   ```
3. Sign in at `/admin/` with that email and password.

Also turn off public sign-ups (Authentication → Sign In / Providers → "Allow new users to sign up"),
since admins are added by hand.

## Run locally

```bash
php -S localhost:8000   # PHP needed for /api; routing via .htaccess won't apply
```

Open http://localhost:8000/ (deep links like `/products` need Apache's `.htaccess`, so start from `/`).

## Deploying to Hostinger

Upload changed files to `public_html` (File Manager / FTP), or connect this repo in hPanel → Git.
Upload `supabase-init.js` with the changed pages; the old `firebase-init.js` on the server can be
deleted afterwards. Before enabling Git deploys make sure the deploy does not delete `uploads/` and the
images on the server, since they are not in the repo.
