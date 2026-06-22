# Portfolio Pages Specification

## Purpose

Public-facing portfolio with 5 sections: Title, Gallery, About, Commissions, Contact. Rendered as Next.js App Router routes preserving the dark fantasy theme, SVG crow logo, and slide transitions from the original static HTML.

## Requirements

### Requirement: Page Routing

The system MUST serve 5 distinct page views under a single route (`/`), each accessible via in-page menu navigation without full page reload. Navigation MUST use client-side transitions with slide animation parity to the original HTML.

#### Scenario: Navigation between sections
- GIVEN a user is viewing any portfolio section
- WHEN they click a menu item
- THEN the view transitions to the target section with slide animation
- AND the URL hash updates to reflect the current section

### Requirement: Visual Theming

The system MUST render all pages with the existing dark fantasy theme: dark background, magenta/pink accent (`#B30089`), parchment-style card containers, Cinzel heading font, and Crimson Text body font. The SVG crow logo MUST appear on the Title screen.

#### Scenario: Theme consistency
- GIVEN a user visits any portfolio section
- THEN all rendered elements use the defined dark fantasy theme
- AND the crow logo renders without broken paths

### Requirement: Section Content

Each of the 5 sections MUST render its specific content: Title (intro + menu), Gallery (grid of artwork thumbnails), About (bio + skill bars), Commissions (categories with slot grid and type selector overlay), Contact (functional form).

#### Scenario: Gallery grid renders
- GIVEN a user navigates to the Gallery section
- THEN artwork thumbnails display in a responsive grid layout

#### Scenario: Commission slot grid with type overlay
- GIVEN a user views the Commissions section
- THEN commission categories display with slot availability
- AND clicking a category shows the type selector overlay (headshot/halfbody/fullbody)

### Requirement: Responsive Layout

The system MUST render correctly on mobile (320px+), tablet, and desktop viewports. Navigation MUST adapt to hamburger menu on narrow screens.

#### Scenario: Mobile layout
- GIVEN a user views the portfolio on a device narrower than 768px
- THEN menu collapses to a hamburger toggle
- AND all content remains readable without horizontal scroll
