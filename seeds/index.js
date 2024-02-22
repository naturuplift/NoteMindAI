// Import Sequelize connection and all seed files
const sequelize = require('../config/connection');
const seedUsers = require('./users-seeds');
const seedCategories = require('./categories-seeds');
const seedNotes = require('./notes-seeds');
// const seedSharedNotes = require('./shared-notes-seeds');
// const seedActionableItems = require('./actionable-items-seeds');
const seedSummaries = require('./summaries-seeds');
// const seedAudioFiles = require('./audio-files-seeds');
// const seedSharedAudio = require('./shared-audio-seeds');
// const seedTranscriptions = require('./transcriptions-seeds');

// Main function to seed all data into the database
const seedAll = async () => {
  // Force sync database, dropping existing tables and recreating them
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  // Call each seed function sequentially to populate database tables
  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedNotes();
  console.log('\n----- NOTES SEEDED -----\n');

  // await seedSharedNotes();
  // console.log('\n----- SHARED NOTES SEEDED -----\n');

  // await seedActionableItems();
  // console.log('\n----- ACTIONABLE ITEMS SEEDED -----\n');

  await seedSummaries();
  console.log('\n----- SUMMARIES SEEDED -----\n');

  // await seedAudioFiles();
  // console.log('\n----- AUDIO FILES SEEDED -----\n');

  // await seedSharedAudio();
  // console.log('\n----- SHARED AUDIO SEEDED -----\n');

  // await seedTranscriptions();
  // console.log('\n----- TRANSCRIPTIONS SEEDED -----\n');

  // Exit the process once all seeds have been planted
  process.exit(0);
};

// Execute the seedAll function to start the seeding process
seedAll();