// Include packages needed for this application
const router = require('express').Router();
const bcrypt = require('bcryptjs');
// Import Users model from the models directory
const { Users } = require('../../models');
require('dotenv').config();

// Signup route
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send('User already exists with this email.');
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
    });

    // TODO: could send a verification email using Nodemailer

    // return the new user's data, no password
    res.status(201).json({ message: "User created successfully", userId: newUser.id });
  } catch (error) {
    console.error('Error during user signup:', error);
    res.status(500).send('Internal server error during signup.');
  }
});

module.exports = router;