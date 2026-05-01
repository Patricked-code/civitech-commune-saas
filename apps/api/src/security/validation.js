const { z } = require('zod');

// Schémas de validation pour l'authentification
const LoginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

const RegisterSchema = z.object({
  email: z.string().email('Email invalide'),
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  tenantSlug: z.string().optional(),
});

// Schémas pour les dossiers
const CreateDossierSchema = z.object({
  procedureId: z.string().cuid('ID de procédure invalide'),
  citizenUserId: z.string().cuid('ID utilisateur invalide'),
});

const UpdateDossierSchema = z.object({
  status: z.enum(['DRAFT', 'SUBMITTED', 'IN_PROGRESS', 'COMPLETED', 'REJECTED']).optional(),
  currentStepCode: z.string().optional(),
});

// Schémas pour les procédures
const CreateProcedureSchema = z.object({
  code: z.string().min(3, 'Le code doit contenir au moins 3 caractères'),
  title: z.string().min(5, 'Le titre doit contenir au moins 5 caractères'),
  category: z.string().min(3, 'La catégorie doit contenir au moins 3 caractères'),
  description: z.string().optional(),
  feeAmount: z.number().min(0).optional(),
  feeCurrency: z.string().default('XOF'),
  estimatedDelayDays: z.number().min(1).optional(),
});

// Schémas pour les utilisateurs
const CreateUserSchema = z.object({
  email: z.string().email('Email invalide'),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  password: z.string().min(8),
  roleCodes: z.array(z.string()).optional(),
  userType: z.enum(['citizen', 'agent', 'admin']).default('citizen'),
});

// Fonction utilitaire de validation
function validateRequest(schema) {
  return (req, res, next) => {
    try {
      const validated = schema.parse(req.body);
      req.validated = validated;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
      }
      next(error);
    }
  };
}

module.exports = {
  LoginSchema,
  RegisterSchema,
  CreateDossierSchema,
  UpdateDossierSchema,
  CreateProcedureSchema,
  CreateUserSchema,
  validateRequest,
};
