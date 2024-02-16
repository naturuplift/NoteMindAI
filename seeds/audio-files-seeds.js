// Import the AudioFile model from the sequelize models
const { AudioFiles } = require('../models');

// Array containing seed data for AudioFile
const audioFileData = [
  {
    noteId: 1,
    audioPath: '/path/to/audio/grocery-list.mp3',
  },
  {
    noteId: 2,
    audioPath: '/path/to/audio/project-plan.mp3',
  },
  {
    noteId: 3,
    audioPath: '/path/to/audio/random-thoughts.mp3',
  },
  {
    noteId: 4,
    audioPath: '/path/to/audio/workout-routine.mp3',
  },
  {
    noteId: 5,
    audioPath: '/path/to/audio/travel-itinerary.mp3',
  },
];

// Function to seed AudioFile data into the database
const seedAudioFiles = () => AudioFiles.bulkCreate(audioFileData);

// Export the seed function for use in the seeding script
module.exports = seedAudioFiles;