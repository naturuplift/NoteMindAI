// Import Router from express and models from the database
const router = require('express').Router();
// Import Notes model from the models directory
const { Notes, Categories } = require('../../models');
// Import Authentication Middleware
const authenticateToken = require('../../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
// import Sequelize Op
const { Op } = require('sequelize');


// GET route to retrieve all Notes for logged-in user
router.get('/notes', authenticateToken, async (req, res) => {
  const { search, filter } = req.query;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    const userId = decoded.userId;
    const conditions = { userId: userId };

    if (search) {
      conditions[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } }
      ];
    }

    console.log('Query Conditions:', conditions);
    
    try {
      let order = [];
      // Ensure filter parameter is being processed correctly
      if (filter === 'createdAt' || filter === 'updatedAt') {
        // Map 'createdAt' and 'updatedAt' to your actual database columns
        const column = filter === 'createdAt' ? 'created_at' : 'updated_at';
        order = [[column, 'DESC']]; // or 'ASC' based on your requirements
      }

      const noteData = await Notes.findAll({
        where: conditions,
        order: order
      });

      console.log('Notes Data:', noteData);

      res.json(noteData);
    } catch (err) {
      console.error('Database Query Error:', err);
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
        // console.log("Token verification failed", err);
        // Forbidden if token is invalid
        return res.sendStatus(403);
      }

      // Extract user ID from token
      const userId = decoded.userId;

      console.log('UserId:', userId);

      try {
          // Fetch notes where user_id matches logged-in user's ID
          const noteData = await Notes.findOne({
              where: {
                  id,
                  userId
              }
          });

          console.log('Notes Data:', noteData);

          if (!noteData) {
              // If no note found
              return res.status(404).json({ message: 'No note found with this id' });
          }

          // return note data
          res.json(noteData);
      } catch (err) {
        console.error('Database Query Error:', err);
          res.status(500).json(err);
      }
  });
});


// POST route to create a new note
router.post('/notes', authenticateToken, async (req, res) => {
  
  // Extract user_id from JWT token
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      // Forbidden if token is invalid
      return res.sendStatus(403);
    }
  
    // Extract user ID from token
    const userId = decoded.userId;
    console.log('UserId:', userId);

    const noteCreationData = {
      userId: userId,
      title: req.body.title,
      content: req.body.content,
    };

    // Inside your route, before creating the note
    if (req.body.categoryId) {
      const categoryExists = await Categories.findByPk(req.body.categoryId);
      if (!categoryExists) {
        return res.status(400).json({ error: "Category does not exist." });
      }
      noteCreationData.categoryId = req.body.categoryId;
    }

    try {
      const noteData = await Notes.create(noteCreationData);

      console.log('Notes Data:', noteData);

      // Return the created note as JSON
      res.status(200).json(noteData);
    } catch (err) {
      console.error('Database Query Error:', err);
      res.status(400).json(err);
    }
  });
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
      console.error('Database Query Error:', err);
      res.status(500).json(err);
    }
  });
});

// Export the router to make these routes available
module.exports = router;
