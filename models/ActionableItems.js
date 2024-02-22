// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import database connection from config
const sequelize = require('../config/connection');

// Initialize ActionableItems model by extending Sequelize's Model class
class ActionableItems extends Model {}

// Set up fields and rules for ActionableItems model for PostgreSQL
ActionableItems.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    noteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'notes',
        key: 'id',
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed'),
      defaultValue: 'pending',
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'actionable_items',
  }
);

// // Set up fields and rules for ActionableItems model
// ActionableItems.init(
//   {
//     // Define columns
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     noteId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'notes',
//         key: 'id',
//       },
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     dueDate: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     status: {
//       type: DataTypes.ENUM('pending', 'completed'),
//       defaultValue: 'pending',
//       allowNull: false,
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
//     modelName: 'actionable_items',
//   }
// );

// ActionableItem exported making it available for use in the app
module.exports = ActionableItems;