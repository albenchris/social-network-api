const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// http://localhost:3001/api/users
router.use('/users', userRoutes);

// http://localhost:3001/api/thoughts
router.use('/thoughts', thoughtRoutes);

module.exports = router;