// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import database connection from config
const sequelize = require('../config/connection');

// Initialize Notes model by extending Sequelize's Model class
class Notes extends Model {}

// Set up fields and rules for Notes model for PostgreSQL
Notes.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'notes',
  }
);

// // Set up fields and rules for Notes model
// Notes.init(
//   {
//     // Define columns
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     title: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     content: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'users',
//         key: 'id',
//       },
//     },
//     categoryId: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//       references: {
//         model: 'categories',
//         key: 'id',
//       },
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW,
//     },
//     updatedAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW,
//       onUpdate: DataTypes.NOW,
//     },
//   },
//   {
//     sequelize,
//     timestamps: true,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'notes',
//   }
// );

// Notes exported making it available for use in the app
module.exports = Notes;