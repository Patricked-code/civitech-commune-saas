# Roadmap Niakara / Civitech Commune SaaS

## Mode de travail

Le projet avance en mode repo-first. Les evolutions sont consolidees dans GitHub, puis le VPS IONOS sera mis a jour plus tard depuis `main`.

## Batch 2 — Stabilisation et portail public

Objectifs : configuration canonique, erreurs API, erreurs frontend, acces dossiers, navigation, footer et pages publiques.

Statut : fusionne dans `main` apres validation CI.

## Batch 3 — Portail public avance

Objectifs : enrichir les pages publiques, preparer actualites, agenda, documents, SEO et composants institutionnels reutilisables.

Statut : fusionne dans `main` apres validation CI.

## Batch 4 — Espace citoyen complet

Objectifs : profil connecte, notifications, messages, documents, brouillons, dossiers soumis et suivi detaille.

Statut : fusionne dans `main`.

## Batch 5 — Cockpit mairie complet

Objectifs : dashboard mairie, files de traitement, priorites, validation documentaire, reporting, audit et vues agents.

Statut : cockpit mairie, file agent et validation documentaire fusionnes dans `main`.

## Batch 6 — Socle SaaS multi-communes

Objectifs : tenant, branding, roles, parametrage, superadmin et duplication pour d autres communes.

Statut : en cours. Documentation d exploitation SaaS ajoutee pour cadrer la future passe GitHub vers VPS IONOS.

## Avant fusion vers main

Verifier le build frontend, le demarrage API, Prisma, login, inscription, dossiers, navigation et variables d environnement.

## Prochaine passe consolidee VPS

La mise a jour VPS doit se faire uniquement depuis `main`, apres validation d une version coherente. Les branches `batch-*` restent temporaires et ne doivent pas servir de source de deploiement.
