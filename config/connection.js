// Include packages needed for this application
//  to load environment variables from a .env file
require('dotenv').config();
// const { Sequelize } = require('sequelize');
const Sequelize = require('sequelize');

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

let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'postgres',
    },
  );
}

// configured Sequelize instance exported
// making it available for use in app
module.exports = sequelize;