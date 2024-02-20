// Import Router from express and models from the database
const router = require('express').Router();
const openAIService = require('../../services/openaiService');

// To test this can be reached: http://localhost:3000/api/ai-features/
router.get('/', (req, res) => {
  res.send('AI Features route works');
});

// POST route to call OpenAI summarize
router.post('/summarize', async (req, res) => {
  try {

    // note content comes in the request body
      const noteContent = req.body.content;

      // Call summarizeText function from openaiService
      const summary = await openAIService.summarizeText(noteContent);

      // return summary response to content
      res.json({ summary });

  } catch (error) {
      console.error('Summarization error:', error);
      res.status(500).send('Error summarizing text');
  }
});

// POST route to call OpenAI summarize
router.post('/explain', async (req, res) => {
  try {

    // note content comes in the request body
      const noteContent = req.body.content;

      // Call summarizeText function from openaiService
      const summary = await openAIService.explainText(noteContent);

      // return summary response to content
      res.json({ summary });

  } catch (error) {
      console.error('Explain content error:', error);
      res.status(500).send('Error explaining text');
  }
});

// POST route to call OpenAI summarize
router.post('/sentiment', async (req, res) => {
  try {

    // note content comes in the request body
      const noteContent = req.body.content;

      // Call summarizeText function from openaiService
      const summary = await openAIService.analyzeSentiment(noteContent);

      // return summary response to content
      res.json({ summary });

  } catch (error) {
      console.error('Sentiment analysis error:', error);
      res.status(500).send('Error analyzing sentiment text');
  }
});

// POST route to call OpenAI summarize
router.post('/writing', async (req, res) => {
  try {

    // note content comes in the request body
      const noteContent = req.body.content;

      // Call summarizeText function from openaiService
      const summary = await openAIService.continueWriting(noteContent);

      // return summary response to content
      res.json({ summary });
  } catch (error) {
      console.error('Writing error:', error);
      res.status(500).send('Error writing text');
  }
});

// POST route to call OpenAI summarize
router.post('/action-item', async (req, res) => {
  try {

    // note content comes in the request body
      const noteContent = req.body.content;

      // Call summarizeText function from openaiService
      const summary = await openAIService.extractActionItem(noteContent);
      // return summary response to content
      res.json({ summary });
  } catch (error) {
      console.error('Action item error:', error);
      res.status(500).send('Error extraction action items');
  }
});

// POST route to call OpenAI summarize
router.post('/classify', async (req, res) => {
  try {

    // note content comes in the request body
      const noteContent = req.body.content;

      // Call summarizeText function from openaiService
      const summary = await openAIService.classifyContent(noteContent);
      // return summary response to content
      res.json({ summary });
  } catch (error) {
      console.error('Classification error:', error);
      res.status(500).send('Error in text classification');
  }
});

module.exports = router;