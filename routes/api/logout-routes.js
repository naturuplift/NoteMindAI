// Include packages needed for this application
const express = require('express');
const router = express.Router();

// Server-side logout route
router.post('/logout', (req, res) => {
    // session is destroyed for current user who made logout request
    req.session.destroy(err => {
        if (err) {
        console.error('Session destruction error:', err);
        return res.status(500).json({ success: false, message: 'Could not log out, please try again.' });
        }
        // session removed success
        res.json({ success: true, message: 'Logged out successfully' });
    });
});

// Export the router to make these routes available
module.exports = router;