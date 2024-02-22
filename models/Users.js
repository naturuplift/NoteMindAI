// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import database connection from config
const sequelize = require('../config/connection');
// include bcrypt package
const bcrypt = require('bcryptjs');

// Initialize User model by extending Sequelize's Model class
class Users extends Model {
  // Method to compare entered password with hashed password in database
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Set up fields and rules for User model for PostgreSQL
Users.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
    modelName: 'users',
    timestamps: true,
    underscored: true,
    hooks: {
      // Hash password before saving a new user
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10); // 10 rounds of salting
      },
      // Hash password before updating a user's password
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

// // Set up fields and rules for User model
// Users.init(
//   {
//     // Define columns
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     username: {
//       type: DataTypes.STRING(50),
//       allowNull: false,
//       unique: true,
//     },
//     email: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true,
//       },
//     },
//     password: {
//       type: DataTypes.STRING(255),
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
//     sequelize, // include bcrypt in the User model for password hashing
//     hooks: {
//       beforeCreate: async (user) => {
//         const hashedPassword = await bcrypt.hash(user.password, 10); // 10 is the salt round
//         user.password = hashedPassword;
//       },
//       beforeUpdate: async (user) => {
//         if (user.changed('password')) {
//           const hashedPassword = await bcrypt.hash(user.password, 10);
//           user.password = hashedPassword;
//         }
//       },
//     },
//     timestamps: true,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'users',
//   }
// );

// User exported making it available for use in the app
module.exports = Users;