const { body, validationResult } = require("express-validator");
const { login, registerCitizen, logout, listDemoUsers } = require("../services/auth.service");
const { requireAuth } = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentification des utilisateurs
 */
module.exports = (app) => {
  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Connecte un utilisateur et retourne un token de session.
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *                 description: Email de l'utilisateur.
   *               password:
   *                 type: string
   *                 format: password
   *                 description: Mot de passe de l'utilisateur.
   *     responses:
   *       200:
   *         description: Connexion réussie, retourne le token et les informations utilisateur.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                 user:
   *                   type: object
   *       400:
   *         description: Données de requête invalides.
   *       401:
   *         description: Identifiants invalides.
   */
  app.post(
    '/api/auth/login',
    [body('email').isEmail().withMessage('Email invalide'), body('password').notEmpty().withMessage('Mot de passe requis')],
    app.locals.asyncRoute(async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
       }

      const { email, password } = req.body;
      const session = await login(email, password);
    if (!session) {
      return res.status(401).json({ error: 'invalid credentials' });
    }
    return res.json(session);
  });

  /**
   * @swagger
   * /api/auth/register:
   *   post:
   *     summary: Enregistre un nouveau citoyen et le connecte automatiquement.
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - firstName
   *               - lastName
   *               - email
   *               - password
   *             properties:
   *               firstName:
   *                 type: string
   *                 description: Prénom du citoyen.
   *               lastName:
   *                 type: string
   *                 description: Nom du citoyen.
   *               email:
   *                 type: string
   *                 format: email
   *                 description: Email du citoyen.
   *               password:
   *                 type: string
   *                 format: password
   *                 description: Mot de passe du citoyen (minimum 6 caractères).
   *               tenantSlug:
   *                 type: string
   *                 description: Slug du tenant (optionnel, par défaut 'niakaramadougou').
   *     responses:
   *       201:
   *         description: Compte citoyen créé et connexion réussie.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                 user:
   *                   type: object
   *       400:
   *         description: Données de requête invalides.
   *       409:
   *         description: L'utilisateur existe déjà.
   *       404:
   *         description: Tenant non trouvé.
   *       500:
   *         description: Échec de l'enregistrement.
   */
  app.post(
    '/api/auth/register',
    [
      body('firstName').notEmpty().withMessage('Prenom requis'),
      body('lastName').notEmpty().withMessage('Nom requis'),
      body('email').isEmail().withMessage('Email invalide'),
      body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caracteres'),
    ],
    app.locals.asyncRoute(async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, firstName, lastName, tenantSlug } = req.body;

      try {
      const session = await registerCitizen({ email, password, firstName, lastName, tenantSlug });
      return res.status(201).json(session);
    } catch (error) {
      if (error.message === 'USER_ALREADY_EXISTS') {
        return res.status(409).json({ error: 'user already exists' });
      }
      if (error.message === 'TENANT_NOT_FOUND') {
        return res.status(404).json({ error: 'tenant not found' });
      }
      return res.status(500).json({ error: 'registration failed' });
    }
  });

  /**
   * @swagger
   * /api/auth/logout:
   *   post:
   *     summary: Déconnecte l'utilisateur actuel.
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Déconnexion réussie.
   */
  app.post("/api/auth/logout", requireAuth, (req, res) => {
    logout(req.token);
    return res.json({ success: true });
  });

  /**
   * @swagger
   * /api/auth/me:
   *   get:
   *     summary: Récupère les informations de l'utilisateur actuellement connecté.
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Informations utilisateur récupérées avec succès.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 email:
   *                   type: string
   *                 firstName:
   *                   type: string
   *                 lastName:
   *                   type: string
   *                 tenantId:
   *                   type: string
   *                 roleCodes:
   *                   type: array
   *                   items:
   *                     type: string
   *       401:
   *         description: Non autorisé.
   */
  app.get("/api/auth/me", requireAuth, (req, res) => {
    return res.json(req.auth);
  });

  /**
   * @swagger
   * /api/auth/demo-users:
   *   get:
   *     summary: Liste les utilisateurs de démonstration disponibles.
   *     tags: [Auth]
   *     responses:
   *       200:
   *         description: Liste des utilisateurs de démonstration.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       email:
   *                         type: string
   *                       password:
   *                         type: string
   */
  app.get("/api/auth/demo-users", async (req, res) => {
    const data = await listDemoUsers();
    return res.json({ data });
  });
};
