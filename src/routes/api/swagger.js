// Note: Need to install swagger-ui-express and swagger-jsdoc:
// npm install swagger-ui-express swagger-jsdoc

// Import the Router function from the express package
// const router = require('express').Router();

const swaggerUi = require('swagger-ui-express');
// swagger-jsdoc that defines the basic structure of API documentation
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Note Taking App API',
      version: '1.0.0',
      description: 'A simple note taking app API',
    },
    servers: [{
      url: 'http://localhost:3000',
      description: 'Local server'
    }],
  },
  apis: ['./src/routes/api/*.js'], // Ensure this path correctly points to your route files
};

// Generate the Swagger docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// TODO: comment when done troubleshooting
// console.log("********************  Hit ./routes/swagger.js   ********************");

// Export a function to use the Express app
module.exports = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log("Swagger UI setup at /api/docs");
};