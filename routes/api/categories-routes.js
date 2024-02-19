// Import Router from express and models from the database
const router = require('express').Router();
// Import Categories model from the models directory
const { Categories } = require('../../models');
// Import Authentication Middleware
const authenticateToken = require('../../middleware/authMiddleware');
const jwt = require('jsonwebtoken');


// GET route to retrieve all categories
router.get('/categories', authenticateToken, async (req, res) => {

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
      const categoryData = await Categories.findAll();
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
});


// GET route to find a single category by its ID
router.get('/categories/:id', authenticateToken, async (req, res) => {

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
      const categoryData = await Categories.findByPk(req.params.id);
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
});


// POST route to create a new category
router.post('/categories', authenticateToken, async (req, res) => {

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
      const categoryData = await Categories.create(req.body);
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
});


// PUT route to update a category's details by ID
router.put('/categories/:id', authenticateToken, async (req, res) => {

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
      const categoryData = await Categories.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!categoryData[0]) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
      res.status(200).json({ message: 'Category updated successfully!' });
    } catch (err) {
      res.status(500).json(err);
    }
 });
});


// DELETE route to remove a category by ID
router.delete('/categories/:id', authenticateToken, async (req, res) => {

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
      const categoryData = await Categories.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
      res.status(200).json({ message: 'Category deleted successfully!' });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

// Export the router to make these routes available
module.exports = router;