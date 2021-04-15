const router = require('express').Router();
const userRoutes = require('./user-routes');

// localhost:3001/api/users
router.use('/users', userRoutes);

module.exports = router;