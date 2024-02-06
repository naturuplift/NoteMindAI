// Include packages needed for this application
const express = require('express');
// includes openaiService.js file
const openaiService = require('./src/services/openaiService');

// Define express web app framework
const app = express();
app.use(express.json());
// Define port for Node.js Server
const PORT = process.env.PORT || 3000;

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
app.post('/summarize', summarizeNoteController);

// Node.js Server listening port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});