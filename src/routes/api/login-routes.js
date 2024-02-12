// Include packages needed for this application
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Users } = require('../../models');
require('dotenv').config();

// Login route
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Use environment variable for JWT secret
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
      res.json({ token });
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

module.exports = router;