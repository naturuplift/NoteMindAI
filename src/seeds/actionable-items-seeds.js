// Import the ActionableItem model from the sequelize models
const { ActionableItems } = require('../models');

// Array containing seed data for ActionableItems
const actionableItemData = [
  {
    noteId: 1,
    description: 'Buy Eggs',
    dueDate: new Date(2024, 2, 1, 12), // Year, Month (0-based), Day, Hours
    status: 'pending',
  },
  {
    noteId: 1,
    description: 'Buy Milk',
    dueDate: new Date(2024, 2, 1, 13),
    status: 'pending',
  },
  {
    noteId: 2,
    description: 'Complete project phase 1',
    // Assuming no due date for some tasks
    status: 'completed',
  },
  {
    noteId: 3,
    description: 'Meditate for 10 minutes',
    dueDate: new Date(2024, 2, 3, 8),
    status: 'pending',
  },
  {
    noteId: 4,
    description: 'Read for 20 minutes',
    dueDate: new Date(2024, 2, 4, 19),
    status: 'pending',
  },
];

// Function to seed ActionableItems data into the database
const seedActionableItems = () => ActionableItems.bulkCreate(actionableItemData);

// Export the seed function for use in the seeding script
module.exports = seedActionableItems;