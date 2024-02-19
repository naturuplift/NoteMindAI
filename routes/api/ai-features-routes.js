// Import Router from express and models from the database
const express = require('express');
const router = express.Router();
// Import Authentication Middleware
const authenticateToken = require('../../middleware/authMiddleware');
const jwt = require('jsonwebtoken');

// Define your routes here
router.get('/', (req, res) => {
  res.send('AI Features route works');
});

// POST route to call OpenAI summarize
router.post('/summarize', async (req, res) => {
  try {
    // note content comes in the request body
      const noteContent = req.body.content;

      console.log("We are inside summarize route")
      console.log(noteContent)
      // Call summarizeText function from openaiService
      const summary = await openAIService.summarizeText(noteContent);
      // return summary response to content
      res.json({ summary });
  } catch (error) {
      console.error('Summarization error:', error);
      res.status(500).send('Error summarizing text');
  }
});


module.exports = router;
