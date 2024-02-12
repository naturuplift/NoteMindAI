// Import Router from express and models from the database
const router = require('express').Router();
// Import Categories model from the models directory
const { Categories } = require('../../models');

// GET route to retrieve all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Categories.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route to find a single category by its ID
router.get('/:id', async (req, res) => {
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

// POST route to create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Categories.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT route to update a category's details by ID
router.put('/:id', async (req, res) => {
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

// DELETE route to remove a category by ID
router.delete('/:id', async (req, res) => {
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

module.exports = router;