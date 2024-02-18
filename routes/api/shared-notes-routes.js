// Import Router from express and models from the database
const router = require('express').Router();
// Import SharedNotes model from the models directory
const { SharedNotes } = require('../../models');
// Import Authentication Middleware
const authenticateToken = require('../../middleware/authMiddleware');
const jwt = require('jsonwebtoken');


// GET route to retrieve all shared notes
router.get('/sharednotes', authenticateToken, async (req, res) => {
  try {
    const sharedNoteData = await SharedNotes.findAll({
      // Optionally, include related models here, like the Note and User models
    });
    res.status(200).json(sharedNoteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route to find a single shared note by its ID (or by noteId and userId combination)
router.get('/sharednotes/:id', authenticateToken, async (req, res) => {
    try {
      const sharedNoteData = await SharedNotes.findByPk(req.params.id);
      if (!sharedNoteData) {
        res.status(404).json({ message: 'No shared note found with this id!' });
        return;
      }
      res.status(200).json(sharedNoteData);
    } catch (err) {
      res.status(500).json(err);
    }
  });  


// POST route to create a new shared note relationship
router.post('/sharednotes', authenticateToken, async (req, res) => {
  try {
    const sharedNoteData = await SharedNotes.create(req.body);
    res.status(200).json(sharedNoteData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// PUT route to update a shared note's permissions
router.put('/sharednotes/:id', authenticateToken, async (req, res) => {
  try {
    const sharedNoteData = await SharedNotes.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!sharedNoteData) {
      res.status(404).json({ message: 'No shared note found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Shared note updated successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});


// DELETE route to remove a shared note relationship by ID
router.delete('/sharednotes/:id', authenticateToken, async (req, res) => {
  try {
    const sharedNoteData = await SharedNotes.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!sharedNoteData) {
      res.status(404).json({ message: 'No shared note found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Shared note deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export the router to make these routes available
module.exports = router;