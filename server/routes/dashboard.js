const express = require('express');
const router = express.Router();
const { isloggedIn } = require('../middleware/checkAuth');
const dashboardcontroller = require('../controllers/dashboardcontroller');

/**
 * dashboard routes
 */
router.get('/dashboard', isloggedIn, dashboardcontroller.dashboard); // Apply the middleware here

module.exports = router;
