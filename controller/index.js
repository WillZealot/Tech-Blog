const router = require('express').Router();

const homeRoutes = require('./homepage.js');
const dashboard = require('./dashboard-route');
const userRoutes = require('./api/user-routes.js');
const loginUserRoutes = require('./api/login-user');
const logOutRoute = require('./api/logout-route');

router.use('/signup', userRoutes);
router.use('/login', loginUserRoutes);
router.use('/logout', logOutRoute);
router.use('/', homeRoutes);
router.use('/dashboard', dashboard);


module.exports = router;