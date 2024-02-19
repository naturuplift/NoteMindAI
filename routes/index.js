// Include packages needed for this application
// Import the Router function from the express package
const router = require('express').Router();
// Import API routes from the ./api directory
const apiRoutes = require('./api');

// Middleware to use API routes
router.use('/api', apiRoutes);

// const notes =[];

router.get('/', (req, res) => {
  res.render('index');
});
router.get('/login', (req, res) => {
  res.render('login');
});
router.use('/signup', (req, res) => {
  res.render('sign-up');
});
router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});
router.get('/editor', (req, res) => {
  res.render('editor');
});
// router.get('/notes/new', (req, res) => {
//   res.render('newNote');
// });

// Catch-all route for any requests not handled by the defined routes
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

// Export the router to make it available for use
module.exports = router;