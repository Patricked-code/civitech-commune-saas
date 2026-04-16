# Authentication and RBAC foundation

## Scope of this batch

This batch introduces the first security architecture layer:
- demo login flow;
- in memory sessions;
- role based access control map;
- authenticated dossier routes;
- future database compatible structure.

## Initial role model
- citizen
- agent
- service_manager
- commune_admin
- super_admin

## Current implementation status

### Implemented now
- demo user seed;
- login endpoint;
- logout endpoint;
- me endpoint;
- auth middleware;
- permission map;
- role permission expansion.

### Planned next
- hashed passwords;
- persistent sessions;
- refresh tokens;
- tenant aware login;
- invitation flow;
- reset password;
- email verification;
- stronger audit logging.

## Demo credentials
- citoyen@niakara.ci / demo1234
- agent.etatcivil@niakara.ci / demo1234
- admin@niakara.ci / demo1234

## Security note
The current implementation is a development foundation only.
It is not the final production security implementation.
