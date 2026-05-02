# 📋 Checklist de Déploiement - CiviTech Commune SaaS

## ✅ Avant le Déploiement

### Code & Qualité
- [ ] Tous les tests passent : `npm run test`
- [ ] Linting réussi : `npm run lint`
- [ ] Pas de console.log en production
- [ ] Pas de fichiers `.env` committé
- [ ] Pas de secrets en dur dans le code
- [ ] Code review complétée
- [ ] Toutes les branches mergées dans main

### Frontend
- [ ] Build réussi : `npm run build:web`
- [ ] Pas d'erreurs de TypeScript
- [ ] Responsive design testé (mobile, tablet, desktop)
- [ ] Animations fluides et performantes
- [ ] Tous les liens fonctionnent
- [ ] Images optimisées
- [ ] Favicon et métadonnées configurées
- [ ] Accessibilité vérifiée (WCAG 2.1 AA)

### Backend
- [ ] Build réussi : `npm run build:api`
- [ ] API endpoints testés
- [ ] Swagger documentation à jour
- [ ] Rate limiting configuré
- [ ] Validation des entrées active
- [ ] Gestion des erreurs complète
- [ ] Logs configurés
- [ ] Migrations de base de données prêtes

### Base de Données
- [ ] Schéma Prisma à jour
- [ ] Migrations testées : `npm run db:push`
- [ ] Indexes créés pour les requêtes fréquentes
- [ ] Backups configurés
- [ ] Stratégie de récupération documentée

### Sécurité
- [ ] HTTPS/SSL configuré
- [ ] JWT_SECRET changé et sécurisé
- [ ] CORS configuré correctement
- [ ] Rate limiting activé
- [ ] Validation des entrées complète
- [ ] Authentification testée
- [ ] Permissions d'accès vérifiées
- [ ] Secrets stockés dans les variables d'environnement

### Infrastructure
- [ ] Serveur provisionné et configuré
- [ ] Docker installé et testé
- [ ] PostgreSQL installé et configuré
- [ ] Node.js version vérifiée
- [ ] Espace disque suffisant
- [ ] Bande passante suffisante
- [ ] Certificats SSL/TLS valides

### Configuration
- [ ] Fichier `.env` créé avec les bonnes valeurs
- [ ] `docker-compose.yml` configuré
- [ ] Domaines DNS pointent vers le serveur
- [ ] Email configuré (optionnel)
- [ ] Stockage de fichiers configuré (optionnel)
- [ ] Monitoring configuré

---

## 🚀 Déploiement

### Étape 1 : Préparation
```bash
# Vérifier la branche
git status
git branch

# Mettre à jour les dépendances
npm install

# Vérifier les tests
npm run test
npm run lint
```

### Étape 2 : Build
```bash
# Build frontend
npm run build:web

# Build backend
npm run build:api

# Vérifier les builds
ls -la apps/web/.next
ls -la apps/api/dist
```

### Étape 3 : Déploiement
```bash
# Option 1 : Docker Compose
docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up -d

# Option 2 : Heroku
git push heroku main

# Option 3 : VPS
npm run start
```

### Étape 4 : Vérification Post-Déploiement
- [ ] Frontend accessible : https://yourdomain.com
- [ ] API accessible : https://api.yourdomain.com
- [ ] Swagger disponible : https://api.yourdomain.com/api-docs
- [ ] Login fonctionne
- [ ] Dashboard citoyen accessible
- [ ] Créer un dossier test
- [ ] Envoyer un message test
- [ ] Télécharger un document test
- [ ] Vérifier les logs : `docker-compose logs -f`

---

## 🔍 Tests Post-Déploiement

### Authentification
```bash
# Tester login
curl -X POST https://api.yourdomain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@niakara.ci","password":"demo1234"}'

# Vérifier le token JWT
# Le token doit être valide et signé correctement
```

### API Health Check
```bash
# Vérifier l'API
curl https://api.yourdomain.com/api/health

# Réponse attendue : {"status":"ok"}
```

### Base de Données
```bash
# Vérifier la connexion
npm run db:status

# Vérifier les migrations
npm run db:migrate:status
```

### Performance
- [ ] Temps de chargement frontend < 3s
- [ ] Temps de réponse API < 500ms
- [ ] Pas d'erreurs 5xx dans les logs
- [ ] Pas de fuites mémoire
- [ ] CPU < 80%
- [ ] RAM < 80%

---

## 📊 Monitoring

### Logs
```bash
# Logs en temps réel
docker-compose logs -f

# Logs spécifiques
docker-compose logs -f api
docker-compose logs -f web
```

### Métriques
- [ ] Monitoring configuré (New Relic, DataDog, etc.)
- [ ] Alertes configurées
- [ ] Dashboards créés
- [ ] Rapports de performance générés

### Backups
- [ ] Backups automatiques configurés
- [ ] Test de restauration effectué
- [ ] Stratégie de rétention définie
- [ ] Stockage des backups sécurisé

---

## 🔐 Sécurité Post-Déploiement

### Vérifications
- [ ] Scan de vulnérabilités : `npm audit`
- [ ] SSL/TLS valide et à jour
- [ ] Headers de sécurité configurés
- [ ] CORS restrictif
- [ ] Rate limiting actif
- [ ] Logs de sécurité activés
- [ ] Authentification 2FA (optionnel)

### Incident Response
- [ ] Plan de réponse aux incidents documenté
- [ ] Contacts d'urgence définis
- [ ] Procédure de rollback testée
- [ ] Équipe de support formée

---

## 📝 Documentation

- [ ] README.md à jour
- [ ] README_DEPLOYMENT.md complété
- [ ] API documentation (Swagger) à jour
- [ ] Architecture documentée
- [ ] Procédures d'exploitation documentées
- [ ] Contacts d'urgence documentés
- [ ] Runbooks créés pour les tâches courantes

---

## 🎉 Après le Déploiement

### Communication
- [ ] Annonce du lancement aux utilisateurs
- [ ] Formation des agents
- [ ] Support utilisateur disponible
- [ ] FAQ créée et publiée

### Monitoring Continu
- [ ] Vérifier les logs quotidiennement
- [ ] Surveiller les performances
- [ ] Répondre aux incidents rapidement
- [ ] Collecter les retours utilisateurs

### Maintenance
- [ ] Planifier les mises à jour de sécurité
- [ ] Planifier les mises à jour de dépendances
- [ ] Planifier les sauvegardes régulières
- [ ] Planifier les tests de récupération

---

## 🆘 Rollback d'Urgence

Si des problèmes critiques surviennent :

```bash
# Arrêter les services
docker-compose down

# Restaurer la version précédente
git checkout <previous-commit>

# Redéployer
docker-compose up -d

# Vérifier les logs
docker-compose logs -f
```

---

## 📞 Support & Escalade

- **Problèmes Frontend** : Vérifier les logs du navigateur + logs Docker
- **Problèmes API** : Vérifier les logs de l'API + Swagger
- **Problèmes BD** : Vérifier la connexion PostgreSQL
- **Problèmes Infrastructure** : Vérifier les ressources serveur

---

**Checklist Complétée** : _______________  
**Date** : _______________  
**Responsable** : _______________  
**Approbation** : _______________
