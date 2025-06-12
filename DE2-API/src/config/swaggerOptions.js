const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DE2-API',
      version: '1.0.0',
      description: 'API documentation for the Desarma2 application',
    },
    servers: [
      {
        url: process.env.SWAGGER_SERVER_URL,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'https',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js', './src/models/*.js'], //cambiar
};

const swaggerDocs = swaggerJsdoc(options);

module.exports = swaggerDocs;