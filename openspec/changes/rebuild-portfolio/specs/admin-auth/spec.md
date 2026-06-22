# Admin Auth Specification

## Purpose

Authentication system protecting CMS dashboard and API routes. Simple session-based auth for a single admin user.

## Requirements

### Requirement: Admin Login

The system MUST provide a login endpoint accepting email and password. Credentials MUST be validated against stored hashed credentials. On success, a server session MUST be created.

#### Scenario: Successful login
- GIVEN an admin user with valid credentials
- WHEN they POST email and password to the login endpoint
- THEN the system returns a session token
- AND the user is redirected to the CMS dashboard

#### Scenario: Invalid credentials
- GIVEN an admin user with invalid credentials
- WHEN they POST incorrect email or password
- THEN the system returns 401 Unauthorized
- AND no session is created

### Requirement: Session Protection

CMS routes (`/admin/*`) and API admin endpoints (`/api/admin/*`) MUST reject unauthenticated requests. Authenticated requests MUST validate the session before returning data.

#### Scenario: Unauthenticated access blocked
- GIVEN a user without a valid session
- WHEN they request a CMS route
- THEN the system redirects to the login page

#### Scenario: API auth enforcement
- GIVEN a request without session cookie
- WHEN the request targets `/api/admin/*`
- THEN the system returns 401 Unauthorized

### Requirement: Admin Logout

The system MUST provide a logout endpoint that destroys the active session.

#### Scenario: Successful logout
- GIVEN an authenticated admin user
- WHEN they POST to the logout endpoint
- THEN the session is destroyed
- AND the user is redirected to the login page
