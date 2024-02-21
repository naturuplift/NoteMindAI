// Import Router from express and models from the database
const router = require('express').Router();
// Import Notes model from the models directory
const { Notes } = require('../../models');
// Import Authentication Middleware
const authenticateToken = require('../../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
// import Sequelize Op
const { Op } = require('sequelize');



// GET route to retrieve all Notes for logged-in user
router.get('/notes', authenticateToken, async (req, res) => {

  // Extract query parameters
  const { search, filter } = req.query;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      // send error status
      return res.sendStatus(403);
    }
    const userId = decoded.userId;
    // Include userId in conditions
    const conditions = { userId: userId };

    // Add search condition if 'search' query parameter is provided
    if (search) {
      conditions[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } }
      ];
    }

    try {
      const noteData = await Notes.findAll({
        where: conditions,
        // Add order condition if 'filter' query parameter is provided
        order: filter ? [['createdAt', filter]] : undefined
      });

      // Function to strip HTML tags
      const stripHtml = (html) => html.replace(/<[^>]*>?/gm, '');

      // Apply stripHtml to each note's content
      const strippedNoteData = noteData.map(note => ({
          ...note.toJSON(),
          content: stripHtml(note.content),
      }));

      res.json(strippedNoteData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
});


// GET route to find a single note by its ID
router.get('/notes/:id', authenticateToken, async (req, res) => {

  // Extract note ID from URL parameters
  const { id } = req.params;

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log("Token verification failed", err);
        // Forbidden if token is invalid
        return res.sendStatus(403);
      }

      // Extract user ID from token
      const userId = decoded.userId;

      try {
          // Fetch notes where user_id matches logged-in user's ID
          const noteData = await Notes.findOne({
              where: {
                  id,
                  userId
              }
          });

          if (!noteData) {
              // If no note found
              return res.status(404).json({ message: 'No note found with this id' });
          }

          // Function to strip HTML tags
          const stripHtml = (html) => html.replace(/<[^>]*>?/gm, '');

          // Strip HTML from note content before sending the response
          noteData.content = stripHtml(noteData.content);

          // return note data
          res.json(noteData);
      } catch (err) {
          res.status(500).json(err);
      }
  });
});


// POST route to create a new note
router.post('/notes', async (req, res) => {
  
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
    const noteData = await Notes.create({
      // set userId extracted from token
      userId: userId,
      title: req.body.title,
      content: req.body.content,
      // Default category ID
      categoryId: req.body.categoryId
    });
    console.log(noteData)
    // Return the created note as JSON
    res.status(200).json(noteData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// PUT route to update a note's details by ID
router.put('/notes/:id', authenticateToken, async (req, res) => {

  const { id } = req.params; // Extract note ID from URL parameters

  // Extract the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      // Forbidden if token is invalid
      return res.sendStatus(403);
    }

    // Extract user ID from decoded token
    const userId = decoded.userId;

    try {
      // update note
      const [updated] = await Notes.update(req.body, {
        where: {
          id: id,
          userId: userId,
        },
      });

      if (updated) {
        const updatedNote = await Notes.findOne({ where: { id: id } });
        // Return the updated note
        res.json(updatedNote);
      } else {
        res.status(404).json({ message: 'No note found with this id' });
      }
    } catch (err) {
      console.error('Error updating note:', err);
      res.status(500).json(err);
    }
  });
});


// DELETE route to remove a note by ID
router.delete('/notes/:id', authenticateToken, async (req, res) => {

  const { id } = req.params; // Extract note ID from URL parameters

  // Extract the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      // Forbidden if token is invalid
      return res.sendStatus(403);
    }

    // Extract user ID from decoded token
    const userId = decoded.userId;

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
});

// Export the router to make these routes available
module.exports = router;
