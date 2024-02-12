// Include packages needed for this application
const express = require('express');
// Imports the routing files from ./routes directory
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection');
// includes openAIService.js file
const openAIService = require('./services/openAIService');
const morgan = require('morgan');
const setupSwagger = require('./routes/api/swagger');

// initializes a new instance of the Express application
const app = express();
const path = require('path');
// set port the server will listen to
const PORT = process.env.PORT || 3000;

// express app to recognize incoming requests as JSON objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// express app to use the routes defined
app.use(routes);
// app.use('/api', apiRoutes);

app.use(morgan('dev')); // Log every request to the console


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

// middleware function mwLogger
const mwLogger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
};
module.exports = mwLogger;

// setup Swagger documentation
setupSwagger(app);// Initialize Swagger

// To verify if Sequelize is successfully connecting to your database
sequelize.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

sequelize.sync({ force: false }) // Consider using 'force: true' only in development
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('Sequelize sync error:', err));