// Include packages needed for this application
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Import Users model from the models directory
const { Users } = require('../../models');
require('dotenv').config();

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user email in user table
    const user = await Users.findOne({ where: { email } });

    // given user then compare password is the same
    if (user && (await bcrypt.compare(password, user.password))) {

      // Use environment variable for JWT secret
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Create or update the session
      req.session.userId = user.id; // Store user ID in session
      req.session.isAuthenticated = true; // Set session as authenticated

      // Include the token in the response
      res.json({ success: true, token: token, redirectUrl: '/dashboard' });
      console.log(token) // print token to use in Postman calls
      
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

// Export the router to make these routes available
module.exports = router;