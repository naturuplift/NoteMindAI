// Import Router from express and models from the database
const router = require('express').Router();
// Import Transcriptions model from the models directory
const { Transcriptions } = require('../../models');
// Import Authentication Middleware
const authenticateToken = require('../../middleware/authMiddleware');
const jwt = require('jsonwebtoken');


// GET route to retrieve all transcriptions
router.get('/transcriptions', authenticateToken, async (req, res) => {
  try {
    const transcriptionData = await Transcriptions.findAll();
    res.status(200).json(transcriptionData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET route to find a single transcription by its ID
router.get('/transcriptions/:id', authenticateToken, async (req, res) => {
  try {
    const transcriptionData = await Transcriptions.findByPk(req.params.id);
    if (!transcriptionData) {
      res.status(404).json({ message: 'No transcription found with this id!' });
      return;
    }
    res.status(200).json(transcriptionData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// POST route to create a new transcription
router.post('/transcriptions/', authenticateToken, async (req, res) => {
  try {
    const transcriptionData = await Transcriptions.create(req.body);
    res.status(200).json(transcriptionData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// PUT route to update a transcription's details by ID
router.put('/transcriptions/:id', authenticateToken, async (req, res) => {
  try {
    const transcriptionData = await Transcriptions.update(req.body, {
      where: { id: req.params.id },
    });
    if (!transcriptionData) {
      res.status(404).json({ message: 'No transcription found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Transcription updated successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});


// DELETE route to remove a transcription by ID
router.delete('/transcriptions/:id', authenticateToken, async (req, res) => {
  try {
    const transcriptionData = await Transcriptions.destroy({
      where: { id: req.params.id },
    });
    if (!transcriptionData) {
      res.status(404).json({ message: 'No transcription found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Transcription deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export the router to make these routes available
module.exports = router;