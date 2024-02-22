// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import database connection from config
const sequelize = require('../config/connection');

// Initialize Summary model by extending Sequelize's Model class
class Summaries extends Model {}

// Set up fields and rules for Summaries model for PostgreSQL
Summaries.init(
  {
    // Define columns
    noteId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'notes',
        key: 'id',
      },
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'summaries',
  }
);

// // Set up fields and rules for Summaries model
// Summaries.init(
//   {
//     // Define columns
//     noteId: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       references: {
//         model: 'notes',
//         key: 'id',
//       },
//     },
//     summary: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW,
//     },
//   },
//   {
//     sequelize,
//     timestamps: true,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'summaries',
//   }
// );

// Summary exported making it available for use in the app
module.exports = Summaries;