// Import the SharedNote model from the sequelize models
const { SharedNotes } = require('../models');

// Array containing seed data for SharedNotes
const sharedNoteData = [
  {
    noteId: 1,
    userId: 2,
    permissionType: 'viewer',
  },
  {
    noteId: 2,
    userId: 2,
    permissionType: 'editor',
  },
  {
    noteId: 3,
    userId: 1,
    permissionType: 'viewer',
  },
  {
    noteId: 4,
    userId: 1,
    permissionType: 'editor',
  },
  {
    noteId: 5,
    userId: 2,
    permissionType: 'viewer',
  },
];

// Function to seed SharedNotes data into the database
const seedSharedNotes = () => SharedNotes.bulkCreate(sharedNoteData);

// Export the seed function for use in the seeding script
module.exports = seedSharedNotes;