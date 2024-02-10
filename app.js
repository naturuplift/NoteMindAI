// Include packages needed for this application
const express = require('express');
// Imports the routing files from ./routes directory
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection');

// initializes a new instance of the Express application
const app = express();
// set port the server will listen to
const PORT = process.env.PORT || 3000;

// express app to recognize incoming requests as JSON objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// express app to use the routes defined
app.use(routes);


// Add code here





// sync sequelize models to the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
  });
});




// includes openaiService.js file
const openaiService = require('./src/services/openaiService');

// Call OpenAI summarizeText function in openaiService.js file
async function summarizeNoteController(req, res) {
  try {
    // Assuming note content comes in the request body
    const noteContent = req.body.noteContent;
    // Call summarizeText function from openaiService
    const summary = await openaiService.summarizeText(noteContent);
    // return summary response to content
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

// Define an endpoint '/summarize' that uses summarizeNoteController
// app.post('/summarize', summarizeNoteController); // TODO: uncomment when need to use