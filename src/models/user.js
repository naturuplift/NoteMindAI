const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const db = require('./'); // imports all models and db connection
const bcrypt = require('bcryptjs');

User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 10); // 10 is the salt round
    user.password = hashedPassword;
});

class User extends Model {}
// define associations in model
User.hasMany(Note, { foreignKey: 'userId' });

User.init({
    // Model attributes
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Model options
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true
});

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}
    
    User.init({
        // Model attributes
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        // Model options
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true
    });
  
    return User;
  };
  

// module.exports = User;