const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homepage.js');
const dashboard = require('./dashboard-route');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboard);


module.exports = router;