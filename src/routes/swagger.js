// Note: Need to install swagger-ui-express and swagger-jsdoc:
// npm install swagger-ui-express swagger-jsdoc

// Import the Router function from the express package
// const router = require('express').Router();

// swagger-jsdoc that defines the basic structure of API documentation
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user.
 *         username:
 *           type: string
 *           description: The user's username.
 *         email:
 *           type: string
 *           description: The user's email address.
 *         password:
 *           type: string
 *           description: The user's password.
 *       example:
 *         id: 1
 *         username: "user1"
 *         email: "user1@example.com"
 *         password: "hashed_password1"
 */
// Swagger set up
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Note Taking App API',
      version: '1.0.0',
      description: 'A simple note taking app API',
    },
  },
  // Path to the API docs
  apis: ['./routes/api/users-routes.js'], // Use glob patterns to match your route files
};

// Generate the Swagger docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// TODO: comment when done troubleshooting
// console.log("********************  Hit ./routes/swagger.js   ********************");

// Export a function to use the Express app
module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};