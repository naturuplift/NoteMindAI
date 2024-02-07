const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./src/config')[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port || 3306,
  }
);

module.exports = sequelize;
