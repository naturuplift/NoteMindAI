// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import database connection from config
const sequelize = require('../config/connection');

// Initialize Categories model by extending Sequelize's Model class
class Categories extends Model {}

// Set up fields and rules for Categories model for PostgreSQL
Categories.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
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
    modelName: 'categories',
  }
);

// // Set up fields and rules for Categories model
// Categories.init(
//   {
//     // Define columns
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//       references: {
//         model: 'users',
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
//     modelName: 'categories',
//   }
// );

// Categories exported making it available for use in the app
module.exports = Categories;