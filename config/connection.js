// Include packages needed for this application
//  to load environment variables from a .env file
require('dotenv').config();
// const { Sequelize } = require('sequelize');
// const Sequelize = require('sequelize');
const { Sequelize } = require('sequelize');

// connection setup supports both local and JawsDB
// (a MySQL add-on for Heroku) connections
// const sequelize = process.env.JAWSDB_URL
// ? new Sequelize(process.env.JAWSDB_URL)
// : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: 'localhost',
//   dialect: 'mysql',
//   dialectOptions: {
//     decimalNumbers: true,
//   },
// });


// this is for PostgreSQL in local
// run this package required first: npm install dotenv pg
// Extract database configuration from environment variables
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

// Create a new Sequelize instance
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres', // Change this to match your database type
  logging: false, // Disable logging; default: console.log
  pool: {
    max: 5, // Maximum number of connection in pool
    min: 0, // Minimum number of connection in pool
    acquire: 30000, // The maximum time, in milliseconds, that a connection can be idle before being released
    idle: 10000 // The maximum time, in milliseconds, that pool will try to get connection before throwing error
  }
});



// // this is for Render:
// let sequelize;

// if (process.env.DB_URL) {
//   sequelize = new Sequelize(process.env.DB_URL);
// } else {
//   sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PW,
//     {
//       host: 'localhost',
//       dialect: 'postgres',
//     },
//   );
// }

// configured Sequelize instance exported
// making it available for use in app
module.exports = sequelize;