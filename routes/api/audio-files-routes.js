// Import Router from express and models from the database
const router = require('express').Router();
// Import AudioFiles model from the models directory
const { AudioFiles } = require('../../models');
// Import Authentication Middleware
const authenticateToken = require('../../middleware/authMiddleware');
const jwt = require('jsonwebtoken');


// GET route to retrieve all audio files
router.get('/audiofiles', authenticateToken, async (req, res) => {
  try {
    const audioFileData = await AudioFiles.findAll();
    res.status(200).json(audioFileData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET route to find a single audio file by its ID
router.get('/audiofiles/:id', authenticateToken, async (req, res) => {
  try {
    const audioFileData = await AudioFiles.findByPk(req.params.id);
    if (!audioFileData) {
      res.status(404).json({ message: 'No audio file found with this id!' });
      return;
    }
    res.status(200).json(audioFileData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// POST route to create a new audio file
router.post('/audiofiles', authenticateToken, async (req, res) => {
  try {
    const audioFileData = await AudioFiles.create(req.body);
    res.status(200).json(audioFileData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// PUT route to update an audio file's details by ID
router.put('/audiofiles/:id', authenticateToken, async (req, res) => {
  try {
    const audioFileData = await AudioFiles.update(req.body, {
      where: { id: req.params.id },
    });
    if (!audioFileData) {
      res.status(404).json({ message: 'No audio file found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Audio file updated successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});


// DELETE route to remove an audio file by ID
router.delete('/audiofiles/:id', authenticateToken, async (req, res) => {
  try {
    const audioFileData = await AudioFiles.destroy({
      where: { id: req.params.id },
    });
    if (!audioFileData) {
      res.status(404).json({ message: 'No audio file found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Audio file deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export the router to make these routes available
module.exports = router;