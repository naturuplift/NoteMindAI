// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import database connection from config
const sequelize = require('../config/connection');

// Initialize AudioFile model by extending Sequelize's Model class
class AudioFiles extends Model {}

// Set up fields and rules for AudioFile model for PostgreSQL
AudioFiles.init(
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
      allowNull: false,
      references: {
        model: 'notes',
        key: 'id',
      },
    },
    audioPath: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'audio_files',
  }
);

// // Set up fields and rules for AudioFile model
// AudioFiles.init(
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
//       allowNull: false,
//       references: {
//         model: 'notes',
//         key: 'id',
//       },
//     },
//     audioPath: {
//       type: DataTypes.STRING(255),
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
//     modelName: 'audio_files',
//   }
// );

// AudioFile exported making it available for use in the app
module.exports = AudioFiles;