# Image Upload Specification

## Purpose

Image upload and serving infrastructure supporting gallery artworks and commission references. Validates type/size, generates optimized URLs, and associates images with records.

## Requirements

### Requirement: File Upload

The system MUST accept image uploads through a secure endpoint. Uploaded files MUST be validated against allowed MIME types (JPEG, PNG, WebP) and maximum file size (10MB).

#### Scenario: Valid upload
- GIVEN an authenticated admin
- WHEN they upload a JPEG under 10MB
- THEN the image is stored
- AND an accessible URL is returned

#### Scenario: Invalid file type
- GIVEN an authenticated admin
- WHEN they upload a non-image file
- THEN the system rejects with 400 Bad Request

#### Scenario: Oversized file
- GIVEN an authenticated admin
- WHEN they upload a file exceeding 10MB
- THEN the system rejects with 413 Payload Too Large

### Requirement: Image Association

Uploaded images MUST be linkable to gallery artworks or commission records. The system MUST store the association in the database.

#### Scenario: Link to artwork
- GIVEN an uploaded image exists
- WHEN an admin creates or edits an artwork
- THEN the image URL can be set as the artwork's image
- AND the association is persisted

### Requirement: Image Serving

Uploaded images MUST be served with cache headers for performance. If using an external provider (Uploadthing/S3), the system MUST return the provider's CDN URL.

#### Scenario: Image loads quickly
- GIVEN a public page references an uploaded image
- WHEN the page renders
- THEN the image loads with appropriate cache headers
