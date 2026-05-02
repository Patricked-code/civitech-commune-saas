const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CiviTech Commune API",
      version: "1.0.0",
      description: "API pour la gestion des services communaux et des dossiers citoyens.",
    },
    servers: [
      {
        url: "/api",
        description: "Serveur de développement local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/models/*.js"], // Chemins vers les fichiers contenant les annotations JSDoc
};

const specs = swaggerJsdoc(options);

module.exports = specs;
