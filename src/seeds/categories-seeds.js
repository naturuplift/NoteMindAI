// Import the Category model from the sequelize models
const { Categories } = require('../models');

// Array containing seed data for Category
const categoryData = [
  {
    name: 'Personal',
    userId: 1,
  },
  {
    name: 'Work',
    userId: 1,
  },
  {
    name: 'Misc',
    userId: 2,
  },
  {
    name: 'Fitness',
    userId: 2,
  },
  {
    name: 'Travel',
    userId: 2,
  },
];

// Function to seed Category data into the database
const seedCategories = () => Categories.bulkCreate(categoryData);

// Export the seed function for use in the seeding script
module.exports = seedCategories;