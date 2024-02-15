// Import Router from express and models from the database
const router = require('express').Router();
// Import Users model from the models directory
const { Users } = require('../../models');
const bcrypt = require('bcryptjs');
const sendEmail = require('../../utils/sendEmail');


// *************************************************
// Signup Route
// *************************************************
router.post('/signup', async (req, res) => {
  // Destructure fields from req.body
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send('User already exists with this email.');
    }
  
    // Create a new user
    const newUser = await Users.create({
      username,
      email,
      password
    });

    // return the new user's data, no password
    res.status(201).json({ message: "User created successfully", userId: newUser.id });
  } catch (error) {
    console.error('Error during user signup:', error);
    res.status(500).send('Internal server error during signup.');
  }
});


// *************************************************
// Login Route
// *************************************************
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Use environment variable for JWT secret
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
      res.json({token});
      // res.render('dashboard', { token });
      // This will print token JWT_SECRET that user will have in .env 
      // console.log("JWT_SECRET:", process.env.JWT_SECRET);
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Server error during login');
  }
});


// *************************************************
// Logout Route
// *************************************************
router.post('/logout', async (req, res) => {
  try {
    // Assume req.userId contains the user's ID, extracted from the JWT in a previous middleware
    const userId = req.userId;

    // Update the lastLogoutAt field to the current timestamp for the user
    await Users.update({ lastLogoutAt: new Date() }, { where: { id: userId } });

    res.status(200).json({ message: 'Logout successful. Tokens issued before now are invalidated.' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).send('Server error during logout');
  }
});


// Export the router to make these routes available
module.exports = router;