// Import Router from express to create route handlers
const router = require('express').Router();
// Import Category and Product models from the models directory
const { Category, Product } = require('../../models');

// Routes for `/api/categories` endpoint

// GET route to find all categories along with their associated Products
router.get('/', async (req, res) => {
  try {
    // Retrieve all categories and include Product data
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    // Send back the category data with status code 200 (OK)
    res.status(200).json(categoryData);
  } catch (err) {
    // If an error occurs, send back the error with status code 500 (Internal Server Error)
    res.status(500).json(err);
  }
});

// GET route to find a single category by its `id` value, including its associated Products
router.get('/:id', async (req, res) => {
  try {
    // Retrieve a single category by its id
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    // If no category is found, return a 404 (Not Found) error
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    // Send back the category data with status code 200 (OK)
    res.status(200).json(categoryData);
  } catch (err) {
    // If an error occurs, send back the error with status code 500 (Internal Server Error)
    res.status(500).json(err);
  }
});

// POST route to create a new category
router.post('/', async (req, res) => {
  try {
    // Create a new category with the data provided in the request body
    const categoryData = await Category.create(req.body);
    // Send back the created category data with status code 200 (OK)
    res.status(200).json(categoryData);
  } catch (err) {
    // If an error occurs, send back the error with status code 400 (Bad Request)
    res.status(400).json(err);
  }
});

// PUT route to update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    // Update a category based on the request body and where the id matches the `id` parameter
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // If no categories were updated, return a 404 (Not Found) error
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    // Send back the status of the update with status code 200 (OK)
    res.status(200).json(categoryData);
  } catch (err) {
    // If an error occurs, send back the error with status code 500 (Internal Server Error)
    res.status(500).json(err);
  }
});

// DELETE route to remove a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    // Delete a category where the id matches the `id` parameter
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    // If no category was found to delete, return a 404 (Not Found) error
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    // Send back the status of the delete operation with status code 200 (OK)
    res.status(200).json(categoryData);
  } catch (err) {
    // If an error occurs, send back the error with status code 500 (Internal Server Error)
    res.status(500).json(err);
  }
});

// Export the router to make these routes available
module.exports = router;
