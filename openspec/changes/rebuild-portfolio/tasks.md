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

- [ ] 1.1 Add deps to `package.json`: bcryptjs, jose, uploadthing, resend, @prisma/client, tailwind-merge, clsx
- [ ] 1.2 Create `prisma/schema.prisma` — 6 models (Admin, Session, Artwork, CommissionCategory, CommissionSlot, ContactMessage)
- [ ] 1.3 Create `src/lib/prisma.ts` — singleton Prisma client
- [ ] 1.4 Create `src/lib/auth.ts` — session create/validate/destroy via jose + bcryptjs
- [ ] 1.5 Create `src/lib/image-storage.ts` — unified upload interface (Uploadthing prod / local dev)
- [ ] 1.6 Create `src/lib/rate-limit.ts` — IP sliding-window (5 req/15min)
- [ ] 1.7 Update `src/app/globals.css` — dark fantasy CSS vars (#B30089, parchment, Cinzel + Crimson Text)
- [ ] 1.8 Update `src/app/layout.tsx` — root layout with fonts, metadata, theme

## Phase 2: Core Pages

- [ ] 2.1 Create `src/components/nav.tsx` — client hamburger nav, hash-links to sections
- [ ] 2.2 Create `src/components/crow-logo.tsx` — SVG crow logo
- [ ] 2.3 Create `src/sections/hero.tsx` — Title section with crow logo + tagline
- [ ] 2.4 Create `src/sections/gallery.tsx` — RSC with Prisma fetch, image grid
- [ ] 2.5 Create `src/sections/about.tsx` — static About with skill bars
- [ ] 2.6 Create `src/sections/commissions.tsx` — RSC category grid, type overlay, slot status
- [ ] 2.7 Create `src/sections/contact.tsx` — RSC shell embedding client contact form
- [ ] 2.8 Update `src/app/page.tsx` — compose all sections with hash-nav

## Phase 3: Admin CMS

- [ ] 3.1 Create `src/app/admin/login/page.tsx` — login form, POST to `/api/admin/login`
- [ ] 3.2 Create `src/app/api/admin/login/route.ts` — POST validate credentials, set session cookie
- [ ] 3.3 Create `src/app/api/admin/logout/route.ts` — POST destroy session
- [ ] 3.4 Create `src/middleware.ts` — guard `/admin/*` + `/api/admin/*`
- [ ] 3.5 Create `src/app/admin/layout.tsx` — admin shell with sidebar nav
- [ ] 3.6 Create `src/app/admin/page.tsx` — dashboard overview (counts)
- [ ] 3.7 Create `src/app/api/admin/artworks/route.ts` — GET list + POST create artwork
- [ ] 3.8 Create `src/app/api/admin/artworks/[id]/route.ts` — PUT + DELETE artwork
- [ ] 3.9 Create `src/app/admin/artworks/page.tsx` — gallery CRUD UI (table + form dialog)
- [ ] 3.10 Create `src/app/api/admin/commissions/route.ts` — GET categories + slots
- [ ] 3.11 Create `src/app/api/admin/commissions/[id]/route.ts` — PUT slot status + client
- [ ] 3.12 Create `src/app/admin/commissions/page.tsx` — commission management UI
- [ ] 3.13 Create `src/app/api/admin/messages/route.ts` — GET messages (list, read status)
- [ ] 3.14 Create `src/app/api/admin/messages/[id]/route.ts` — PUT mark-read, DELETE
- [ ] 3.15 Create `src/app/admin/messages/page.tsx` — messages inbox UI

## Phase 4: Contact & Integration

- [ ] 4.1 Create `src/components/contact-form.tsx` — client form with validation + submit
- [ ] 4.2 Create `src/app/api/contact/route.ts` — POST validate, rate-limit, persist, send email
- [ ] 4.3 Create `src/app/api/upload/route.ts` — POST image upload (Uploadthing / local)

## Phase 5: Polish

- [ ] 5.1 Run `npx prisma migrate dev` — apply schema, seed admin user
- [ ] 5.2 Visual parity: compare all 5 sections against static HTML on desktop + mobile
- [ ] 5.3 Verify admin login, artwork CRUD, commission updates, messages inbox
- [ ] 5.4 Verify contact form submission + email notification end-to-end
