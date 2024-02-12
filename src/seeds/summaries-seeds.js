// Import the Summary model from the sequelize models
const { Summaries } = require('../models');

// Array containing seed data for Summary
const summaryData = [
  {
    noteId: 1,
    summary: 'A short summary of the grocery list, including essential items like eggs, milk, and bread.',
  },
  {
    noteId: 2,
    summary: 'Overview of the project plan, highlighting key milestones, objectives, and deadlines.',
  },
  {
    noteId: 3,
    summary: 'Collection of random thoughts and ideas, reflecting personal musings and reflections.',
  },
  {
    noteId: 4,
    summary: 'Detailed workout routine plan for a week, focusing on different muscle groups each day.',
  },
  {
    noteId: 5,
    summary: 'Planned itinerary for upcoming travel, including destinations like Paris, Rome, and Berlin.',
  },
];

// Function to seed Summary data into the database
const seedSummaries = () => Summaries.bulkCreate(summaryData);

// Export the seed function for use in the seeding script
module.exports = seedSummaries;