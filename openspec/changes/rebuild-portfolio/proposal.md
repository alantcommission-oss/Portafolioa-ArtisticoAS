# Proposal: Rebuild Portfolio

## Intent

Rebuild the single-page static HTML portfolio into a modern Next.js web application with a CMS backend. The current site has no backend, broken image paths, a non-functional contact form, and no way to manage gallery or commission content — forcing manual HTML edits for every update. Artists need self-service content management.

## Scope

### In Scope
- 5 portfolio sections as Next.js App Router pages (Title, Gallery, About, Commissions, Contact)
- Admin dashboard with authentication for content management
- Gallery CMS with image upload, captions, and ordering
- Commission system with categories, pricing, and slot management
- Contact form with email delivery and DB persistence
- Dark fantasy theme parity with existing visual identity
- Image upload via Uploadthing or direct S3
- PostgreSQL via Neon + Prisma 5

### Out of Scope
- Payment processing (deferred)
- User registration / multi-language / analytics
- Image manipulation (resizing, filters)

## Capabilities

### New Capabilities
- `portfolio-pages`: Public-facing portfolio pages (Title, Gallery, About, Commissions, Contact)
- `admin-auth`: Admin authentication for the CMS dashboard
- `gallery-cms`: Gallery management with image upload, captions, reordering
- `commission-system`: Commission categories, pricing, slot mgmt, client ordering
- `contact-form`: Contact form with email notification and message persistence
- `image-upload`: Image upload and serving infrastructure

### Modified Capabilities
None (greenfield).

## Approach

Next.js 16 App Router with React Server Components for public pages. API routes for admin CRUD. Prisma 5 + Neon for persistence. Custom session-based auth for admin. Uploadthing for image storage. Tailwind CSS v4 + shadcn/ui, maintaining existing dark fantasy theme (magenta/pink #B30089, parchment cards, Cinzel + Crimson Text).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/app/` | New | App Router pages replacing static HTML |
| `prisma/schema.prisma` | New | DB models for gallery, commissions, messages, admin |
| `src/app/api/` | New | Admin CRUD API routes |
| `src/components/` | New | Reusable React components |
| `public/uploads/` | New | Uploaded images (or external S3) |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Next.js 16 breaking changes | Med | Read `node_modules/next/dist/docs/` before coding |
| No test runner installed | Med | Manual visual parity against static HTML |
| Neon DB connectivity | Low | Use existing Prisma schema patterns |

## Rollback Plan

Revert via `git revert` to last clean commit. Static HTML file stays untouched — site can fall back to it. Prisma migrations can be rolled back with `migrate down` if schema was applied.

## Dependencies

- Neon PostgreSQL database URL
- Uploadthing or S3-compatible storage account
- Environment variables for secrets

## Success Criteria

- [ ] All 5 original sections render identically — visual parity achieved
- [ ] Admin can log in and manage gallery, commissions, and messages
- [ ] Contact form submits, persists to DB, and sends email notification
- [ ] Images upload and display correctly across all pages
- [ ] Responsive layout matches on mobile, tablet, and desktop
