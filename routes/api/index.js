// Import Router from express to handle route definitions
const router = require('express').Router();

// Import routes for models
const userRoutes = require('./users-routes');
const categoryRoutes = require('./categories-routes');
const noteRoutes = require('./notes-routes');
const sharedNoteRoutes = require('./shared-notes-routes');
const actionableItemsRoutes = require('./actionable-items-routes');
const summaryRoutes = require('./summaries-routes');
const audioFileRoutes = require('./audio-files-routes');
const sharedAudioRoutes = require('./shared-audio-routes');
const transcriptionRoutes = require('./transcriptions-routes');
const loginRoutes = require('./login-routes');
const signupRoutes = require('./signup-routes');


// Register routes to be served under own paths
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/notes', noteRoutes);
router.use('/sharednotes', sharedNoteRoutes);
router.use('/actionableitems', actionableItemsRoutes);
router.use('/summaries', summaryRoutes);
router.use('/audiofiles', audioFileRoutes);
router.use('/sharedaudio', sharedAudioRoutes);
router.use('/transcriptions', transcriptionRoutes);
router.use('/login', loginRoutes);
router.use('/signup', signupRoutes);


// TODO: comment when done troubleshooting
// console.log("********************  Hit ./routes/api/index.js   ********************");

// Export the configured router to be used by the main application
module.exports = router;