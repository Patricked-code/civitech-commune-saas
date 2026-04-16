# Product architecture - Civitech Commune SaaS

## Product vision

Civitech Commune SaaS is a multi commune platform for local public service digitization.
It is designed as a SaaS foundation, not as a one off municipal brochure site.

The platform is organized around five core pillars:
- public portal and institutional content;
- citizen account and request tracking;
- administrative cockpit for agents and supervisors;
- workflow and dossier processing engine;
- document, payment and audit foundation.

## Application spaces

### 1. Public portal
The public portal exposes:
- institutional presentation;
- news and events;
- service directory;
- public information;
- necrology;
- public consultation pages;
- catalogue of administrative procedures.

### 2. Citizen space
The citizen space covers:
- account profile;
- procedure initiation;
- document upload;
- payment receipt access;
- dossier history;
- request status tracking;
- notifications.

### 3. Agent workspace
The agent workspace is meant for:
- dossier qualification;
- document checks;
- service assignment;
- request completion handling;
- action comments;
- workflow progression.

### 4. Commune admin cockpit
The commune admin cockpit manages:
- users, roles and departments;
- service catalogues;
- procedure templates;
- fees and payment settings;
- queues and workload;
- document templates;
- dashboards;
- publication modules.

### 5. SaaS super admin
The super admin layer manages:
- tenant creation;
- module activation;
- branding and domain setup;
- plan management;
- environment supervision;
- global audit and support.

## Functional modules

### Core MVP modules
- authentication and identity;
- tenant configuration;
- citizen profile;
- procedure catalogue;
- dossier lifecycle;
- status and workflow steps;
- document management foundation;
- admin dashboards;
- public CMS foundation;
- API and deployment foundation.

### Phase 2 modules
- payment integration;
- document generation;
- complete state civil workflows;
- appointment scheduling;
- internal comments and collaboration;
- social aid procedures;
- reporting and exports.

### Phase 3 modules
- multi commune production controls;
- advanced workflow builder;
- advanced notifications;
- public consultation module;
- local business directory;
- tourism and territorial attractiveness modules.

## Domain model summary

The long term domain model should include at minimum:
- Tenant;
- User;
- Role;
- Permission;
- Department;
- Service;
- Procedure;
- ProcedureStep;
- Dossier;
- DossierDocument;
- DossierEvent;
- Payment;
- Receipt;
- Notification;
- CMSPage;
- NewsPost;
- Event;
- AuditLog.

## Architecture principles

- tenant first design;
- additive development;
- clean separation between public, citizen and admin experiences;
- modular backend services;
- strong auditability;
- deployment readiness for VPS and later container hosting;
- blockchain not required for the MVP;
- compatibility with future proof or certification modules.
