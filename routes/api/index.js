// Import Router from express to handle route definitions
const router = require('express').Router();

// Import routes for models
const userRoutes = require('./users-routes');
const categoryRoutes = require('./categories-routes');
const noteRoutes = require('./notes-routes');
// const sharedNoteRoutes = require('./shared-notes-routes');
// const actionableItemsRoutes = require('./actionable-items-routes');
const summaryRoutes = require('./summaries-routes');
// const audioFileRoutes = require('./audio-files-routes');
// const sharedAudioRoutes = require('./shared-audio-routes');
// const transcriptionRoutes = require('./transcriptions-routes');
const loginRoutes = require('./login-routes');
const logoutRoutes = require('./logout-routes');
const signupRoutes = require('./signup-routes');
const aiFeaturesRoutes = require('./ai-features-routes');

// Register routes to be served under own paths
router.use('/', userRoutes);
router.use('/', categoryRoutes);
router.use('/', noteRoutes);
// router.use('/', sharedNoteRoutes);
// router.use('/', actionableItemsRoutes);
router.use('/', summaryRoutes);
// router.use('/', audioFileRoutes);
// router.use('/', sharedAudioRoutes);
// router.use('/', transcriptionRoutes);
router.use('/', loginRoutes);
router.use('/', logoutRoutes);
router.use('/', signupRoutes);
router.use('/ai-features', aiFeaturesRoutes);

// Export the configured router to be used by the main application
module.exports = router;