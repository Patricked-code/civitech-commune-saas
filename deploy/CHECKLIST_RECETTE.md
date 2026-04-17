# Checklist de recette complète

## A. Infrastructure
- [ ] le VPS répond en SSH
- [ ] Node.js installé et version validée
- [ ] PM2 installé
- [ ] Nginx installé et actif
- [ ] PostgreSQL actif
- [ ] domaines DNS pointent vers le VPS
- [ ] HTTPS actif

## B. Backend
- [ ] `/health` répond 200
- [ ] `/api/system/info` répond 200
- [ ] Prisma client généré
- [ ] migrations appliquées
- [ ] seed exécuté si nécessaire
- [ ] logs API sans erreur bloquante

## C. Frontend
- [ ] home accessible
- [ ] portail commune accessible
- [ ] espace citoyen accessible après login
- [ ] vues agent accessibles selon rôle
- [ ] vues admin accessibles selon rôle

## D. Authentification
- [ ] login démo fonctionne
- [ ] session persistante après navigation
- [ ] logout fonctionne
- [ ] routes protégées refusent les accès non autorisés

## E. Parcours citoyen
- [ ] création brouillon naissance
- [ ] création brouillon copie d’acte
- [ ] création brouillon décès
- [ ] création brouillon mariage
- [ ] reprise d’un brouillon
- [ ] sauvegarde de brouillon
- [ ] soumission d’un dossier
- [ ] visualisation de mes brouillons
- [ ] visualisation de mes dossiers soumis

## F. Parcours dossier
- [ ] détail dossier charge
- [ ] payload métier lisible
- [ ] commentaire workflow ajouté
- [ ] pièce jointe simulée ajoutée
- [ ] statut documentaire visible

## G. Parcours agent
- [ ] file agent charge
- [ ] filtres statut fonctionnent
- [ ] filtres procédure fonctionnent
- [ ] priorité du jour charge
- [ ] commentaire interne ajouté
- [ ] validation documentaire approuvée
- [ ] validation documentaire rejetée
- [ ] passage à l’étape suivante fonctionne

## H. Sécurité minimale
- [ ] JWT secret changé
- [ ] mots de passe de démo revus si nécessaire
- [ ] base de production distincte de la base locale
- [ ] variables d’environnement non commitées
- [ ] ports publics réduits à 80/443/22

## I. Exploitation
- [ ] `pm2 save` exécuté
- [ ] `pm2 startup` exécuté
- [ ] redémarrage serveur testé
- [ ] Nginx relancé sans erreur
- [ ] logs vérifiés après redémarrage
