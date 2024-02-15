// Import Router from express and models from the database
const router = require('express').Router();
// Import Notes model from the models directory
const { Notes } = require('../../models');


// *************************************************
// 
// *************************************************






// GET route to retrieve all Notes
router.get('/', async (req, res) => {
  try {
    const noteData = await Notes.findAll();
    res.render('notes', { notes: noteData });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route to find a single note by its ID
router.get('/:id', async (req, res) => {
  try {
    const noteData = await Notes.findByPk(req.params.id);
    if (!noteData) {
      res.status(404).json({ message: 'No note found with this id!' });
      return;
    }
    res.render('note', { notes: noteData });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route to create a new note
router.post('/', async (req, res) => {
  try {
    const noteData = await Notes.create(req.body);
    res.render('notes', { notes: noteData });
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT route to update a note's details by ID
router.put('/:id', async (req, res) => {
  try {
    const noteData = await Notes.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!noteData) {
      res.status(404).json({ message: 'No note found with this id!' });
      return;
    }
    res.render('notes', { notes: noteData });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE route to remove a note by ID
router.delete('/:id', async (req, res) => {
  try {
    const noteData = await Notes.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!noteData) {
      res.status(404).json({ message: 'No note found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Note deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;