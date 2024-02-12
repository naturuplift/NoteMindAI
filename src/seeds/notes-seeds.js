// Import the Note model from the sequelize models
const { Notes } = require('../models');

// Array containing seed data for Notes
const noteData = [
  {
    title: 'Grocery List',
    content: 'Eggs, Milk, Bread',
    userId: 1,
    categoryId: 1,
  },
  {
    title: 'Project Plan',
    content: 'Project plan details...',
    userId: 1,
    categoryId: 2,
  },
  {
    title: 'Random Thoughts',
    content: 'Some random thoughts...',
    userId: 2,
    categoryId: 3,
  },
  {
    title: 'Workout Routine',
    content: 'Monday: Chest, Tuesday: Back...',
    userId: 2,
    categoryId: 4,
  },
  {
    title: 'Travel Itinerary',
    content: 'Visit Paris, Rome, Berlin...',
    userId: 2,
    categoryId: 5,
  },
];

// Function to seed Notes data into the database
const seedNotes = () => Notes.bulkCreate(noteData);

// Export the seed function for use in the seeding script
module.exports = seedNotes;