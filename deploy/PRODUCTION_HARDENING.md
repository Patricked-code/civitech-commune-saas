# Batch final — Production hardening

## 1. Secrets
- utiliser des secrets longs et uniques
- ne jamais laisser les exemples en production
- stocker les secrets hors Git

## 2. Base de données
- créer un utilisateur PostgreSQL dédié
- limiter les droits au strict nécessaire
- mettre en place un backup quotidien
- tester une restauration

## 3. Réseau et OS
- désactiver les accès inutiles
- limiter les ports exposés
- activer le firewall
- renforcer SSH (clé, pas de mot de passe si possible)
- mettre à jour régulièrement le serveur

## 4. Nginx
- forcer HTTPS
- ajouter en-têtes de sécurité si nécessaire
- fixer `client_max_body_size` selon la politique documentaire
- surveiller les logs d’accès et d’erreur

## 5. Application
- ajouter rate limiting sur les routes sensibles
- ajouter validation schéma systématique des payloads
- journaliser les erreurs applicatives
- standardiser les réponses d’erreur

## 6. Auth et permissions
- revoir toutes les permissions par rôle
- vérifier que les routes citoyen, agent et admin sont cloisonnées
- tester les accès interdits avec comptes non autorisés

## 7. Pièces jointes
- finaliser l’upload binaire réel
- vérifier type MIME et taille
- éventuellement scanner les fichiers
- prévoir une stratégie de suppression / archivage

## 8. Monitoring et exploitation
- activer des logs persistants
- surveiller PM2 et Nginx
- ajouter des alertes simples si possible
- suivre l’usage CPU / RAM / disque

## 9. Tests finaux
- rejouer toute la checklist de recette
- faire un test de redémarrage serveur
- faire un test de rollback applicatif
- faire un test de backup / restore base
