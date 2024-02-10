const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Correct the path

class Note extends Model {}

Note.init({
    // Model attributes
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // 'users' refers to table name
            key: 'id', // 'id' refers to column name in users table
        }
    }
}, {
    // Model options
    sequelize,
    modelName: 'Note',
    tableName: 'notes',
    timestamps: true
});

module.exports = (sequelize, DataTypes) => {
    class Note extends Model {}
  
    Note.init({
        // Model attributes
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // 'users' refers to table name
                key: 'id', // 'id' refers to column name in users table
            }
        }
    }, {
        // Model options
        sequelize,
        modelName: 'Note',
        tableName: 'notes',
        timestamps: true
    });
  
    return Note;
  };
  

// module.exports = Note;