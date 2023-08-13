const router = require('express').Router();
//Homepage Imports
const viewHomePost = require('./api/homepageApi/viewPost');
const commentPost = require('./api/homepageApi/createComment');
const homeRoutes = require('./homepage');
const dashboardRoutes = require('./dashboard-route');
const userRoutes = require('./api/login-signup-logout-api/user-routes');
const loginUserRoutes = require('./api/login-signup-logout-api/login-user');
const logoutRoute = require('./api/login-signup-logout-api/logout-route');
//Dashboard imports
const createPostRoutes = require('./api/dashboardApi/createPost');
const viewPostRoutes = require('./api/dashboardApi/viewPost');
const updatePostRoutes = require('./api/dashboardApi/updatePost');
const deletePostRoutes = require('./api/dashboardApi/deletePost');
const editUserRoutes = require('./api/dashboardApi/editUser');

router.use('/signup', userRoutes);
router.use('/login', loginUserRoutes);
router.use('/logout', logoutRoute);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

// DashBoard API routes
router.use('/dashboard/api', createPostRoutes);
router.use('/dashboard/api', viewPostRoutes);
router.use('/dashboard/api', updatePostRoutes);
router.use('/dashboard/api', deletePostRoutes);
router.use('/dashboard/api', editUserRoutes);
// HomePage Apis
router.use('/api', viewHomePost);
router.use('/api', commentPost);
//router.use('/api', editUserRoutes);

module.exports = router;
