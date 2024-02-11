// Include packages needed for this application
const express = require('express');
// Imports the routing files from ./routes directory
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./routes/swagger.js');
// includes openAIService.js file
const openAIService = require('./services/openAIService');

// initializes a new instance of the Express application
const app = express();
// set port the server will listen to
const PORT = process.env.PORT || 3000;

// express app to recognize incoming requests as JSON objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// express app to use the routes defined
app.use(routes);

// TODO: Temporary Route Test - comment when done
// app.get('/test', (req, res) => res.send('Test route is working'));

// Import Swagger configuration
const setupSwagger = require('./routes/swagger.js');
// Use the setupSwagger function and pass the Express app instance
setupSwagger(app);


// To verify if Sequelize is successfully connecting to your database
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Serve Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// sync sequelize models to the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
  });
});






// Call OpenAI summarizeText function in openAIService.js file
async function summarizeNoteController(req, res) {
  try {
    // Assuming note content comes in the request body
    const noteContent = req.body.noteContent;
    // Call summarizeText function from openaiService
    const summary = await openAIService.summarizeText(noteContent);
    // return summary response to content
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Define an endpoint '/summarize' that uses summarizeNoteController
// app.post('/summarize', summarizeNoteController); // TODO: uncomment when need to use