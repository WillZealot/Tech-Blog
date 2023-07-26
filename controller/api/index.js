const router = require('express').Router();

const userRoutes = require('./user-routes');
const loginUserRoutes = require('./login-user');

router.use('/user', userRoutes);
router.use('/login', loginUserRoutes);


module.exports = router;