// Include packages needed for this application
const express = require('express');
const db = require('./src/models');
const User = require('./src/models/user');
const Note = require('./src/models/note');
const sequelize = require('./src/config/connection');

// includes openaiService.js file
const openaiService = require('./src/services/openaiService');

// Define express web app framework
const app = express();
app.use(express.json());
// Define port for Node.js Server
const PORT = process.env.PORT || 3000;



sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

db.sequelize.sync({ force: false }) // Using 'force: true' will drop and recreate tables
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
});

// const sequelize = require('./src/db');

// sequelize.authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

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

// Node.js Server listening port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
