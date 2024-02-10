// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');

// Initialize SharedNote model by extending Sequelize's Model class
class SharedNote extends Model {}

// Set up fields and rules for SharedNote model
SharedNote.init(
  {
    // Define columns
    noteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'notes',
        key: 'id',
      },
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      primaryKey: true,
    },
    permissionType: {
      type: DataTypes.ENUM('viewer', 'editor'),
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
    modelName: 'sharedNote',
  }
);

// SharedNote exported making it available for use in the app
module.exports = SharedNote;