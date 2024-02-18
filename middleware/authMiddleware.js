// Include packages needed for this application
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Authentication middleware
const authenticateToken = (req, res, next) => {
  
  // Get token from Authorization header
  const authHeader = req.headers['authorization'];
  // Bearer TOKEN
  const token = authHeader && authHeader.split(' ')[1];

  // Unauthorized if token is missing
  if (token == null) {
    return res.sendStatus(401);
  }

  // verify user token with secret
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Forbidden if token is invalid
      return res.sendStatus(403);
    }

    // Add user payload to request object
    req.user = user;
    // Proceed to next route
    next();
  });
};

// making it available for use in app
module.exports = authenticateToken;