// Import Router from express and models from the database
const router = require('express').Router();
// Import SharedAudio, AudioFiles and Users model from the models directory
const { SharedAudio, AudioFiles, Users } = require('../../models');
// Import Authentication Middleware
const authenticateToken = require('../../middleware/authMiddleware');
const jwt = require('jsonwebtoken');


// GET route to retrieve all shared audio
router.get('/sharedaudio', authenticateToken, async (req, res) => {
  try {
    const sharedAudioData = await SharedAudio.findAll({
      include: [AudioFiles, Users] // Assuming you want to include related audio and user info
    });
    res.status(200).json(sharedAudioData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET route to find a single shared audio by its ID
router.get('/sharedaudio/:id', authenticateToken, async (req, res) => {
try {
  const sharedAudioData = await SharedAudio.findByPk(req.params.id, {
    include: [AudioFiles, Users] // Include audio and user info
  });
  if (!sharedAudioData) {
    res.status(404).json({ message: 'No shared audio found with this id!' });
    return;
  }
  res.status(200).json(sharedAudioData);
} catch (err) {
  res.status(500).json(err);
}
});


// POST route to create a new shared audio relationship
router.post('/sharedaudio', authenticateToken, async (req, res) => {
  try {
    const sharedAudioData = await SharedAudio.create({
      audioId: req.body.audioId,
      userId: req.body.userId,
      permissionType: req.body.permissionType,
    });
    res.status(200).json(sharedAudioData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// PUT route to update shared audio's permission by ID
router.put('/sharedaudio/:id', authenticateToken, async (req, res) => {
  try {
    const sharedAudioData = await SharedAudio.update(req.body, {
      where: { id: req.params.id },
    });
    if (sharedAudioData[0] === 0) {
      res.status(404).json({ message: 'No shared audio found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Shared audio updated successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});


// DELETE route to remove a shared audio relationship by ID
router.delete('/sharedaudio/:id', authenticateToken, async (req, res) => {
  try {
    const sharedAudioData = await SharedAudio.destroy({
      where: { id: req.params.id },
    });
    if (!sharedAudioData) {
      res.status(404).json({ message: 'No shared audio found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Shared audio deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});  

// Export the router to make these routes available
module.exports = router;