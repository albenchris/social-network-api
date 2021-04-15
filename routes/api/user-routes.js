const router = require('express').Router();
const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
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
    .put(updateUser)
    .delete(deleteUser);

// localhost:3001/api/users/<id>/friends/<friendId>
// ADD or REMOVE friend
router
    .route('/:id/friends/:friendId')
    // .post()
    // .delete();

module.exports = router;