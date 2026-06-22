# Tasks: Rebuild Portfolio

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~1700 (23 new, 5 mod) |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | Single PR (exception-ok) |
| Delivery strategy | exception-ok |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: size-exception
400-line budget risk: High

## Phase 1: Foundation / Infrastructure

- [x] 1.1 Add deps to `package.json`: bcryptjs, jose (uploadthing, resend deferred — need accounts)
- [x] 1.2 Create `prisma/schema.prisma` — 6 models (Admin, Session, Artwork, CommissionCategory, CommissionSlot, ContactMessage)
- [x] 1.3 Create `src/lib/prisma.ts` — singleton Prisma client
- [x] 1.4 Create `src/lib/auth.ts` — session create/validate/destroy via jose + bcryptjs
- [x] 1.5 Create `src/lib/image-storage.ts` — unified upload interface (local dev / Uploadthing prod stub)
- [x] 1.6 Create `src/lib/rate-limit.ts` — IP sliding-window (5 req/15min)
- [x] 1.7 Update `src/app/globals.css` — dark fantasy CSS vars (#B30089, parchment, Cinzel + Crimson Text)
- [x] 1.8 Update `src/app/layout.tsx` — root layout with fonts, metadata, theme

## Phase 2: Core Pages

- [x] 2.1 Create `src/components/nav.tsx` — client hamburger nav, hash-links to sections
- [x] 2.2 Create `src/components/crow-logo.tsx` — SVG crow logo
- [x] 2.3 Create `src/sections/hero.tsx` — Title section with crow logo + tagline
- [x] 2.4 Create `src/sections/gallery.tsx` — RSC with Prisma fetch, image grid
- [x] 2.5 Create `src/sections/about.tsx` — static About with skill bars
- [x] 2.6 Create `src/sections/commissions.tsx` — RSC category grid, type overlay, slot status
- [x] 2.7 Create `src/sections/contact.tsx` — RSC shell embedding client contact form
- [x] 2.8 Update `src/app/page.tsx` — compose all sections with hash-nav

## Phase 3: Admin CMS

- [x] 3.1 Create `src/app/admin/login/page.tsx` — login form, POST to `/api/admin/login`
- [x] 3.2 Create `src/app/api/admin/login/route.ts` — POST validate credentials, set session cookie
- [x] 3.3 Create `src/app/api/admin/logout/route.ts` — POST destroy session
- [x] 3.4 Create `src/proxy.ts` — Next.js 16 `proxy` (middleware replacement) guarding `/admin/*` + `/api/admin/*`
- [x] 3.5 Create `src/app/admin/layout.tsx` — admin shell with sidebar nav
- [x] 3.6 Create `src/app/admin/page.tsx` — dashboard overview (counts, force-dynamic for DB access)
- [x] 3.7 Create `src/app/api/admin/artworks/route.ts` — GET list + POST create artwork
- [x] 3.8 Create `src/app/api/admin/artworks/[id]/route.ts` — PUT + DELETE artwork
- [x] 3.9 Create `src/app/admin/artworks/page.tsx` — gallery CRUD UI (table + form dialog)
- [x] 3.10 Create `src/app/api/admin/commissions/route.ts` — GET categories + slots
- [x] 3.11 Create `src/app/api/admin/commissions/[id]/route.ts` — PUT slot status + client
- [x] 3.12 Create `src/app/admin/commissions/page.tsx` — commission management UI
- [x] 3.13 Create `src/app/api/admin/messages/route.ts` — GET messages (list, read status)
- [x] 3.14 Create `src/app/api/admin/messages/[id]/route.ts` — PUT mark-read, DELETE
- [x] 3.15 Create `src/app/admin/messages/page.tsx` — messages inbox UI

## Phase 4: Contact & Integration

- [x] 4.1 Create `src/components/contact-form.tsx` — client form with validation + submit
- [x] 4.2 Create `src/app/api/contact/route.ts` — POST validate, rate-limit, persist (email notification deferred — needs Resend account)
- [x] 4.3 Create `src/app/api/upload/route.ts` — POST image upload (local filesystem)

## Phase 5: Polish

- [x] 5.1 Prisma schema ready, client generated (`npx prisma generate`). DB migration deferred (requires real DATABASE_URL).
- [ ] 5.2 Visual parity: compare all 5 sections against static HTML on desktop + mobile
- [ ] 5.3 Verify admin login, artwork CRUD, commission updates, messages inbox
- [ ] 5.4 Verify contact form submission + email notification end-to-end
