# Contact Form Specification

## Purpose

Functional contact form that accepts submissions, persists them to the database, and sends email notification to the admin.

## Requirements

### Requirement: Form Submission

The system MUST accept contact form submissions with fields: name, email, subject, and message. All fields MUST be validated before persistence.

#### Scenario: Successful submission
- GIVEN a user fills all required form fields
- WHEN they submit the contact form
- THEN the submission is persisted to the database
- AND the user sees a success confirmation

#### Scenario: Validation failure
- GIVEN a user submits with missing or invalid email
- WHEN the form is submitted
- THEN the system returns validation errors
- AND no submission is persisted

### Requirement: Email Notification

On receiving a valid form submission, the system MUST send an email notification to the configured admin address with the submission details.

#### Scenario: Admin notified
- GIVEN a valid contact form submission
- WHEN the submission is persisted
- THEN an email with name, email, subject, and message is sent to the admin
- AND the email includes the submission timestamp

### Requirement: Rate Limiting

The system MUST rate-limit form submissions per IP to prevent abuse. The limit SHOULD be configurable, with a default of 5 submissions per 15 minutes.

#### Scenario: Rate limit exceeded
- GIVEN an IP has submitted 5 times in 15 minutes
- WHEN another submission is attempted
- THEN the system returns 429 Too Many Requests
- AND the submission is rejected
