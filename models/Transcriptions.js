// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import database connection from config
const sequelize = require('../config/connection');

// Initialize Transcription model by extending Sequelize's Model class
class Transcriptions extends Model {}

// Set up fields and rules for Transcriptions model for PostgreSQL
Transcriptions.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    audioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'audio_files',
        key: 'id',
      },
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      length: 'long',
    },
    transcriptionQuality: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
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
    modelName: 'transcriptions',
  }
);

// // Set up fields and rules for Transcription model
// Transcriptions.init(
//   {
//     // Define columns
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     audioId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'audio_files',
//         key: 'id',
//       },
//     },
//     text: {
//       type: DataTypes.TEXT('long'),
//       allowNull: false,
//     },
//     transcriptionQuality: {
//       type: DataTypes.DECIMAL(5, 2),
//       allowNull: true,
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
//     modelName: 'transcriptions',
//   }
// );

// Transcription exported making it available for use in the app
module.exports = Transcriptions;