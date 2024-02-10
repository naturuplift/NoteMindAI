// Include packages needed for this application
// Import the Router function from the express package
const router = require('express').Router();
// Import API routes from the ./api directory
const apiRoutes = require('./api');

// Use the API routes for requests to /api
router.use('/api', apiRoutes);

// Catch-all route for any requests not handled by the defined routes
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

// Export the router to make it available for use
module.exports = router;