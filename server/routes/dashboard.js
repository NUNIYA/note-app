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
router.delete('/dashboard/item-delete/:id', isloggedIn, dashboardcontroller.dashboardDeleteNote);
router.get('/dashboard/add', isloggedIn, dashboardcontroller.dashboardAddNote); 
router.post('/dashboard/add', isloggedIn, dashboardcontroller.dashboardAddNoteSubmit);     
router.get('/dashboard/search', isloggedIn, dashboardcontroller.dashboardSearch);
router.post('/dashboard/search', isloggedIn, dashboardcontroller.dashboardSearchSubmit);

module.exports = router;
