'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const db = require('./'); // imports all models and db connection

db.User.hasMany(db.Note, { foreignKey: 'userId' });
db.Note.belongsTo(db.User, { foreignKey: 'userId' });

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
module.exports = db;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  
  User.init({
      // Model attributes
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
              isEmail: true
          }
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false
      }
  }, {
      // Model options
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true
  });

  return User;
};