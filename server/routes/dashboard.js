const express = require('express');
const router = express.Router();
const { isloggedIn } = require('../middleware/checkAuth');
const dashboardcontroller = require('../controllers/dashboardcontroller');

/**
 * dashboard routes
 */
router.get('/dashboard', isloggedIn, dashboardcontroller.dashboard); 
router.get('/dashboard/item/:id', isloggedIn, dashboardcontroller.dashboardViewNote); 
router.put('/dashboard/item/:id', isloggedIn, dashboardcontroller.dashboardUpdateNote); 


module.exports = router;
