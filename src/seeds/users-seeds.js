// Import the User model from the sequelize models
const { Users } = require('../models');

// Array containing seed data for users
const userData = [
  {
    username: 'user1',
    email: 'user1@example.com',
    password: 'password123',
  },
  {
    username: 'user2',
    email: 'user2@example.com',
    password: 'password456',
  },
  {
    username: 'user3',
    email: 'user3@example.com',
    password: 'password789',
  },
  {
    username: 'user4',
    email: 'user4@example.com',
    password: 'password101112',
  },
  {
    username: 'user5',
    email: 'user5@example.com',
    password: 'password131415',
  },
];

// Function to seed users data into the database
const seedUsers = () => Users.bulkCreate(userData, {
  individualHooks: true, // Ensures that hooks, such as password hashing, are executed
  returning: true, // Needed for PostgreSQL, not necessary for MySQL
});

// Export the seed function for use in the seeding script
module.exports = seedUsers;