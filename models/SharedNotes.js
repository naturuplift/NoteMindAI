// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import database connection from config
const sequelize = require('../config/connection');

// Initialize SharedNotes model by extending Sequelize's Model class
class SharedNotes extends Model {}

// Set up fields and rules for SharedAudio model for PostgreSQL
SharedAudio.init(
  {
    // Define columns
    audioId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'audio_files',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    permissionType: {
      type: DataTypes.ENUM('viewer', 'listener'),
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
    modelName: 'shared_audio',
  }
);

// // Set up fields and rules for SharedNotes model
// SharedNotes.init(
//   {
//     // Define columns
//     noteId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'notes',
//         key: 'id',
//       },
//       primaryKey: true,
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'users',
//         key: 'id',
//       },
//       primaryKey: true,
//     },
//     permissionType: {
//       type: DataTypes.ENUM('viewer', 'editor'),
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
//     modelName: 'shared_notes',
//   }
// );

// SharedNotes exported making it available for use in the app
module.exports = SharedNotes;