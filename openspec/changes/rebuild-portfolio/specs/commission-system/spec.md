# Commission System Specification

## Purpose

Commission categories with pricing, slot management, and status tracking. Supports 4 categories (Stickers/SFW/NSFW/Parejas) with max 3 slots each and type-based pricing.

## Requirements

### Requirement: Commission Categories

The system MUST define 4 commission categories: Stickers, SFW, NSFW, and Parejas. Each category MUST have a name, base price, and max 3 slots. Categories MUST support 3 commission types: headshot, halfbody, fullbody, each with distinct pricing.

#### Scenario: View commission categories
- GIVEN a user visits the Commissions section
- THEN all 4 categories display with names and base prices
- AND each category shows its type-specific pricing

### Requirement: Slot Management

Each category MUST track exactly 3 slots with status: available, pending, or completed. The system MUST allow admins to update slot status.

#### Scenario: Update slot status
- GIVEN an authenticated admin
- WHEN they change a slot from "available" to "pending"
- THEN the public page shows the slot as occupied

### Requirement: Slot Availability Display

The public portfolio MUST display slot availability per category (e.g., "2/3 available"). Fully booked categories MUST indicate no availability.

#### Scenario: Category fully booked
- GIVEN all 3 slots in a category are pending or completed
- WHEN a user views the Commissions section
- THEN the category shows "Fully booked" or equivalent visual indicator
