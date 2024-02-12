// Import the SharedAudio model from the sequelize models
const { SharedAudio } = require('../models');

// Array containing seed data for SharedAudio
const sharedAudioData = [
  {
    audioId: 1,
    userId: 2,
    permissionType: 'listener',
  },
  {
    audioId: 2,
    userId: 1,
    permissionType: 'listener',
  },
  {
    audioId: 3,
    userId: 2,
    permissionType: 'listener',
  },
  {
    audioId: 4,
    userId: 1,
    permissionType: 'listener',
  },
  {
    audioId: 5,
    userId: 2,
    permissionType: 'listener',
  },
];

// Function to seed SharedAudio data into the database
const seedSharedAudio = () => SharedAudio.bulkCreate(sharedAudioData);

// Export the seed function for use in the seeding script
module.exports = seedSharedAudio;