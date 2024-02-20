// Import Router from express and models from the database
const router = require('express').Router();
// Import Summaries, Notes model from the models directory
const { Summaries, Notes } = require('../../models');
// Import Authentication Middleware
const authenticateToken = require('../../middleware/authMiddleware');
const jwt = require('jsonwebtoken');


// GET route to retrieve all summaries
router.get('/summaries', authenticateToken, async (req, res) => {
  try {
    const summaryData = await Summaries.findAll({
      include: [{ model: Notes }],
    });

    // Function to strip HTML tags
    const stripHtml = (html) => html.replace(/<[^>]*>?/gm, '');

    // Apply stripHtml to each summary's content
    const strippedSummaryData = summaryData.map(summary => ({
        ...summary.toJSON(),
        summary: stripHtml(summary.summary),
    }));

    res.status(200).json(strippedSummaryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET route to find a single summary by its noteId
router.get('/summaries/:noteId', authenticateToken, async (req, res) => {

  try {
    const summaryData = await Summaries.findByPk(req.params.noteId, {
      include: [{ model: Notes }],
    });

    if (!summaryData) {
      res.status(404).json({ message: 'No summary found for this note id!' });
      return;
    }

    // Function to strip HTML tags
    const stripHtml = (html) => html.replace(/<[^>]*>?/gm, '');

    // Strip HTML from summary content before sending the response
    summaryData.summary = stripHtml(summaryData.summary);

    res.status(200).json(summaryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// POST route to create a new summary
router.post('/summaries', authenticateToken, async (req, res) => {

  // Extract user_id from JWT token
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  let userId;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // Return forbidden if token is invalid
        return res.sendStatus(403);
      }
      userId = decoded.userId;
  });
  
  try {
    const summaryData = await Summaries.create({
      noteId: req.body.noteId,
      summary: req.body.summary,
    });
    res.status(200).json(summaryData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// PUT route to update an existing summary by noteId
router.put('/summaries/:noteId', authenticateToken, async (req, res) => {
  try {
    const summaryData = await Summaries.update(req.body, {
      where: { noteId: req.params.noteId },
    });
    if (summaryData[0] === 0) {
      res.status(404).json({ message: 'No summary found with this note id!' });
      return;
    }
    console.log(summaryData)
    res.status(200).json({ message: 'Summary updated successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});


// DELETE route to remove a summary by noteId
router.delete('/summaries/:noteId', authenticateToken, async (req, res) => {
  try {
    const summaryData = await Summaries.destroy({
      where: { noteId: req.params.noteId },
    });
    if (!summaryData) {
      res.status(404).json({ message: 'No summary found with this note id!' });
      return;
    }
    res.status(200).json({ message: 'Summary deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});  

// Export the router to make these routes available
module.exports = router;