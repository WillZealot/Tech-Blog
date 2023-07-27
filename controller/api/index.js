const router = require('express').Router();

const userRoutes = require('./user-routes');
const loginUserRoutes = require('./login-user');
const dashboard = require('./dashboard-route')

router.use('/user', userRoutes);
router.use('/login', loginUserRoutes);
router.use('/dashboard', dashboard)


module.exports = router;