const router = require('express').Router();

const homeRoutes = require('./homepage');
const dashboardRoutes = require('./dashboard-route');
const userRoutes = require('./api/user-routes');
const loginUserRoutes = require('./api/login-user');
const logoutRoute = require('./api/logout-route');

const createPostRoutes = require('./api/createPost');
const viewPostRoutes = require('./api/viewPost');
const updatePostRoutes = require('./api/updatePost');
const deletePostRoutes = require('./api/deletePost');
const editUserRoutes = require('./api/editUser');

router.use('/signup', userRoutes);
router.use('/login', loginUserRoutes);
router.use('/logout', logoutRoute);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

// API routes
router.use('/dashboard/api', createPostRoutes);
router.use('/dashboard/api', viewPostRoutes);
router.use('/dashboard/api', updatePostRoutes);
router.use('/dashboard/api', deletePostRoutes);
router.use('/dashboard/api', editUserRoutes);

module.exports = router;
