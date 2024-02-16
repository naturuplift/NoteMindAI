// Import Router from express and models from the database
const router = require('express').Router();
// Import ActionableItems model from the models directory
const { ActionableItems } = require('../../models');


// *************************************************
// GET route to retrieve all actionable items
// *************************************************
router.get('/', async (req, res) => {
  try {
    const actionableItemData = await ActionableItems.findAll();
    res.status(200).json(actionableItemData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// *************************************************
// GET route to find a single actionable item by its ID
// *************************************************
router.get('/:id', async (req, res) => {
    try {
      const actionableItemData = await ActionableItems.findByPk(req.params.id);
      if (!actionableItemData) {
        res.status(404).json({ message: 'No actionable item found with this id!' });
        return;
      }
      res.status(200).json(actionableItemData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


// *************************************************
// POST route to create a new actionable item
// *************************************************
router.post('/', async (req, res) => {
  try {
    const actionableItemData = await ActionableItems.create(req.body);
    res.status(200).json(actionableItemData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// *************************************************
// PUT route to update an actionable item's details by ID
// *************************************************
router.put('/:id', async (req, res) => {
  try {
    const actionableItemData = await ActionableItems.update(req.body, {
      where: { id: req.params.id },
    });
    if (!actionableItemData) {
      res.status(404).json({ message: 'No actionable item found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Actionable item updated successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});


// *************************************************
// DELETE route to remove an actionable item by ID
// *************************************************
router.delete('/:id', async (req, res) => {
  try {
    const actionableItemData = await ActionableItems.destroy({
      where: { id: req.params.id },
    });
    if (!actionableItemData) {
      res.status(404).json({ message: 'No actionable item found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Actionable item deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;