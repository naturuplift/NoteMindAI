// Import the Transcription model from the sequelize models
const { Transcriptions } = require('../models');

// Array containing seed data for Transcription
const transcriptionData = [
  {
    audioId: 1,
    text: 'Transcription for audio 1, detailing the contents of the grocery list.',
    transcriptionQuality: 95.00,
  },
  {
    audioId: 2,
    text: 'Transcription for audio 2, outlining the steps and goals of the project plan.',
    transcriptionQuality: 98.00,
  },
  {
    audioId: 3,
    text: 'Transcription for audio 3, capturing various random thoughts and musings.',
    transcriptionQuality: 92.00,
  },
  {
    audioId: 4,
    text: 'Transcription for audio 4, describing the weekly workout routine in detail.',
    transcriptionQuality: 96.00,
  },
  {
    audioId: 5,
    text: 'Transcription for audio 5, providing a detailed travel itinerary for the upcoming trip.',
    transcriptionQuality: 97.00,
  },
];

// Function to seed Transcription data into the database
const seedTranscriptions = () => Transcriptions.bulkCreate(transcriptionData);

// Export the seed function for use in the seeding script
module.exports = seedTranscriptions;