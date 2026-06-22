# Gallery CMS Specification

## Purpose

Admin CRUD for gallery artworks. Supports up to 24 artworks with title, description, image URL, category tags, and display ordering.

## Requirements

### Requirement: Artwork CRUD

The system MUST allow authenticated admins to Create, Read, Update, and Delete gallery artworks. Each artwork MUST have: title, description, image URL, category tags, and order/position integer.

#### Scenario: Create artwork
- GIVEN an authenticated admin
- WHEN they submit artwork data including title, description, image URL, and tags
- THEN the artwork is persisted to the database with the next available order position
- AND the gallery page reflects the new artwork

#### Scenario: Update artwork order
- GIVEN an authenticated admin with existing artworks
- WHEN they change the order/position value of an artwork
- THEN the gallery grid re-renders in the updated sequence

#### Scenario: Delete artwork
- GIVEN an authenticated admin with an existing artwork
- WHEN they delete the artwork
- THEN the artwork is removed from the database
- AND remaining artworks maintain sequential order

### Requirement: Gallery Capacity

The system MUST support a maximum of 24 artworks. Creating beyond this limit MUST be rejected.

#### Scenario: Capacity limit
- GIVEN the gallery has 24 artworks
- WHEN an admin attempts to create a 25th artwork
- THEN the system returns a capacity error
- AND no artwork is created
