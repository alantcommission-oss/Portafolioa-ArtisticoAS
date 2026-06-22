# Design: Rebuild Portfolio

## Technical Approach

Single Next.js 16 App Router app with RSC-first public pages + admin dashboard. 5 portfolio sections as hash-named section components on `/`. Admin behind `/admin/*` with custom session auth. Prisma 5 + Neon for persistence, Uploadthing (prod) / local (dev) for images. Dark fantasy theme via Tailwind v4 CSS variable overrides.

## Architecture Decisions

**Route Design**: Single page `/` with hash sections. Matches original UX, enables slide transitions, preserves scroll state. Rejected: separate routes (breaks single-page), search params (causes re-renders).

**Auth Strategy**: Custom session via Prisma — bcrypt hashed password, sessions table with expiry, httpOnly cookie. Middleware guards `/admin/*`. Rejected: NextAuth (overkill for 1 admin), hardcoded env variable (no rotation).

**Image Storage**: Uploadthing (prod) — 2GB free tier, CDN, simple SDK. Local `public/uploads/` (dev) — no external dep. Unified interface at `lib/image-storage.ts` swapping impl per `NODE_ENV`.

**Component Architecture**: Sections are RSC by default. Client boundaries only at: hamburger nav, contact form, gallery lightbox, admin CRUD.

**Theme System**: Override shadcn CSS variables in globals.css with dark fantasy palette (#B30089 accent, dark backgrounds, light parchment cards). Cinzel (headings) + Crimson Text (body) via `next/font/google`.

## Data Flow

```
Browser → RSC Sections (Server) → Prisma → Neon
              ↓
         Contact Form (Client) → API → Prisma + Email
              ↓
         Admin Dashboard → API (Auth MW) → Prisma CRUD
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `prisma/schema.prisma` | Modify | 6 models: Admin, Session, Artwork, CommissionCategory, CommissionSlot, ContactMessage |
| `src/app/globals.css` | Modify | Dark fantasy CSS variable overrides |
| `src/app/layout.tsx` | Modify | Cinzel + Crimson Text font loading |
| `src/app/page.tsx` | Modify | Section-based layout replacing CNA boilerplate |
| `src/sections/*.tsx` (×5) | Create | Title, Gallery, About, Commissions, Contact section components |
| `src/components/nav.tsx` | Create | Top nav + hamburger (client) |
| `src/components/theme-provider.tsx` | Create | Dark mode client wrapper |
| `src/lib/db.ts` | Create | Singleton Prisma client |
| `src/lib/image-storage.ts` | Create | Uploadthing/local abstraction layer |
| `src/middleware.ts` | Create | Admin route auth guard |
| `src/app/api/contact/route.ts` | Create | Contact form handler |
| `src/app/api/admin/auth/*/route.ts` (×2) | Create | Login + logout |
| `src/app/api/admin/artworks/route.ts` + `[id]/` | Create | Gallery CRUD |
| `src/app/api/admin/commissions/route.ts` | Create | Commission CRUD |
| `src/app/api/admin/messages/route.ts` | Create | Message inbox |
| `src/app/admin/*/page.tsx` (×4) | Create | Login, dashboard, gallery mgmt, commissions mgmt, messages |
| `package.json` | Modify | Add bcryptjs, jose, uploadthing, resend |

## Prisma Schema (key models)

```prisma
model Admin       { id String @id @default(cuid()) email String @unique passwordHash String }
model Session     { id String @id @default(cuid()) adminId String token @unique expiresAt DateTime admin Admin @relation(fields: [adminId], references: [id]) }
model Artwork     { id String @id @default(cuid()) title String description String? imageUrl String tags String[] position Int }
model CommissionCategory { id String @id @default(cuid()) name String basePrice Decimal headshotPrice Decimal? halfbodyPrice Decimal? fullbodyPrice Decimal? sortOrder Int slots CommissionSlot[] }
model CommissionSlot { id String @id @default(cuid()) categoryId String status String clientName String? clientEmail String? category CommissionCategory @relation(fields: [categoryId], references: [id]) }
model ContactMessage { id String @id @default(cuid()) name String email String subject String message String read Boolean @default(false) }
```

## Testing Strategy

| Layer | Approach |
|-------|----------|
| Visual parity | Manual — compare each section against static HTML |
| Auth flow | Manual via browser — login, session, redirect |
| API routes | Manual via curl / browser |

No test runner installed. Acceptance = visual parity against original HTML.

## Migration

Greenfield — no migration. `npx prisma migrate dev --name init` + seed script for admin + commission categories. Static HTML untouched as fallback.

## Open Questions

- [ ] Uploadthing + Resend env vars — need accounts before apply
- [ ] Cinzel + Crimson Text confirmed for fonts?
- [ ] Rate limit config — hardcoded 5/15min or env var?
