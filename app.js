// Include packages needed for this application
const express = require('express');
// Imports the routing files from ./routes directory
const routes = require('./routes');
// const bodyParser = require('body-parser');
const path = require('path');
// import sequelize connection
const sequelize = require('./config/connection');
// includes openAIService.js file
const openAIService = require('./services/openAIService');
const morgan = require('morgan');

// set port the server will listen to
const PORT = process.env.PORT || 3000;

// initializes a new instance of the Express application
const app = express();

//Setting view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// express app to recognize incoming requests as JSON objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the landing page
app.get('/', (req, res) => {
  res.render('index');
});

//editor
app.use('/quill', express.static(path.join(__dirname, 'node_modules/quill/dist')));

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


app.use(morgan('tiny')); // Log every request to the console
// middleware function mwLogger
const mwLogger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
};
app.use(mwLogger);

// express app to use the routes defined
app.use(routes);

sequelize.sync({ force: false }) // Consider using 'force: true' only in development
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('Sequelize sync error:', err));