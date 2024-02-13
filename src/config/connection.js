// Include packages needed for this application
//  to load environment variables from a .env file
require('dotenv').config();
// const { Sequelize } = require('sequelize');
const Sequelize = require('sequelize');

// connection setup supports both local and JawsDB
// (a MySQL add-on for Heroku) connections
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD, // Add this line
  {
    host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    decimalNumbers: true,
  },
});

// configured Sequelize instance exported
// making it available for use in app
module.exports = sequelize;