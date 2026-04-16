# JWT and admin phase

## Implemented in this phase
- JWT utility for access tokens;
- password hashing utility;
- auth middleware switched to token verification;
- permission middleware;
- admin routes foundation;
- connected frontend pages for demo login, admin console and dossiers.

## New backend routes
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me
- GET /api/admin/summary
- GET /api/admin/users
- GET /api/admin/procedures
- POST /api/admin/procedures
- GET /api/admin/dossiers

## Frontend connected pages
- /auth/demo-login
- /commune/admin-console
- /commune/dossiers-connectes

## Remaining next steps
- persist hashed passwords in seed and database migration flow;
- add procedure update and delete endpoints;
- add user invitation and creation endpoints;
- add protected frontend layouts;
- add refresh session strategy;
- connect forms to real CRUD actions.
