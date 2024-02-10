// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');

// Initialize Transcription model by extending Sequelize's Model class
class Transcription extends Model {}

// Set up fields and rules for Transcription model
Transcription.init(
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
      type: DataTypes.TEXT('long'),
      allowNull: false,
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
    modelName: 'transcription',
  }
);

// Transcription exported making it available for use in the app
module.exports = Transcription;