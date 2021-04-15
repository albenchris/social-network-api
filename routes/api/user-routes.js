const router = require('express').Router();
const {
    getAllUsers,
    getOneUser,
    createUser,
} = require('../../controllers/user-controllers');

// localhost:3001/api/users/
// GET All, POST
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// localhost:3001/api/users/<id>
// GET One, PUT, DELETE
router
    .route('/:id')
    .get(getOneUser)
    // .put()
    // .delete();

module.exports = router;