const router = require('express').Router();
const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    removeThought
} = require('../../controllers/thought-controllers');

// http://localhost:3001/api/thoughts/
// GET All, CREATE
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// http://localhost:3001/api/thoughts/<thoughtId>
// GET One, UPDATE, REMOVE
router
    .route('/:id')
    .get(getOneThought)
    .put(updateThought)
    .delete(removeThought);

// http://localhost:3001/api/thoughts/<thoughtId>/reactions/
// ADD reaction
router
    .route('/:id/reactions/:reactionId')
    // .put()

// http://localhost:3001/api/thoughts/<thoughtId>/reactions/<reactionId>
// REMOVE reaction
router
    .route('/:id/reactions/:reactionId')
    // .delete();

module.exports = router;