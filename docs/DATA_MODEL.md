# Data model foundation

## Target core entities

### Tenant
Represents one commune or territorial organization.

Fields:
- id
- slug
- name
- country_code
- status
- primary_domain
- timezone
- branding_json
- created_at
- updated_at

### User
Represents a platform actor.

Fields:
- id
- tenant_id
- email
- password_hash
- first_name
- last_name
- phone
- status
- user_type
- created_at
- updated_at

### Role
Fields:
- id
- tenant_id
- code
- label
- scope

### Permission
Fields:
- id
- code
- label
- module

### UserRole
Bridge table between users and roles.

### Department
Fields:
- id
- tenant_id
- code
- label
- parent_department_id

### Service
Fields:
- id
- tenant_id
- department_id
- code
- label
- is_active

### Procedure
Fields:
- id
- tenant_id
- code
- title
- category
- description
- status
- fee_amount
- fee_currency
- estimated_delay_days
- requires_payment
- requires_appointment

### ProcedureStep
Fields:
- id
- procedure_id
- code
- title
- step_order
- step_type
- assigned_role_code
- sla_hours

### Dossier
Fields:
- id
- tenant_id
- procedure_id
- citizen_user_id
- reference
- status
- current_step_code
- submitted_at
- closed_at

### DossierDocument
Fields:
- id
- dossier_id
- document_type
- storage_key
- original_filename
- mime_type
- uploaded_by_user_id
- validation_status

### DossierEvent
Tracks state transitions and operations.

Fields:
- id
- dossier_id
- event_type
- event_label
- actor_user_id
- payload_json
- created_at

### Payment
Fields:
- id
- tenant_id
- dossier_id
- amount
- currency
- status
- payment_provider
- payment_reference
- paid_at

### Receipt
Fields:
- id
- payment_id
- receipt_number
- receipt_url
- issued_at

### Notification
Fields:
- id
- tenant_id
- user_id
- channel
- template_code
- status
- sent_at

### CMSPage
Fields:
- id
- tenant_id
- slug
- title
- body
- status
- published_at

### NewsPost
Fields:
- id
- tenant_id
- slug
- title
- excerpt
- body
- status
- published_at

### PublicEvent
Fields:
- id
- tenant_id
- title
- starts_at
- ends_at
- location
- status

### AuditLog
Fields:
- id
- tenant_id
- actor_user_id
- action_code
- target_type
- target_id
- metadata_json
- created_at

## Initial role families
- citizen
- agent
- service_manager
- commune_admin
- super_admin

## Initial procedure families
- state civil
- social aid
- public consultation
- local services
- business services
