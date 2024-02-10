// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');

// Initialize Summary model by extending Sequelize's Model class
class Summary extends Model {}

// Set up fields and rules for Summary model
Summary.init(
  {
    // Define columns
    noteId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'notes',
        key: 'id',
      },
    },
    summary: {
      type: DataTypes.TEXT,
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
    modelName: 'summary',
  }
);

// Summary exported making it available for use in the app
module.exports = Summary;