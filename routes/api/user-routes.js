const router = require('express').Router();
const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,

    addFriend,
    removeFriend,
} = require('../../controllers/user-controllers');

// http://localhost:3001/api/users/
// GET All, CREATE
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// http://localhost:3001/api/users/<id>
// GET One, UPDATE, DELETE
router
    .route('/:id')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

// http://localhost:3001/api/users/<id>/friends/<friendId>
// ADD or REMOVE friend
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;