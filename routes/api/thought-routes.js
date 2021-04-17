const router = require('express').Router();
const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controllers');

// http://localhost:3001/api/thoughts/
// GET all, CREATE
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// http://localhost:3001/api/thoughts/<thoughtId>
// GET one, UPDATE, REMOVE
router
    .route('/:thoughtId')
    .get(getOneThought)
    .put(updateThought)
    .delete(removeThought);

// http://localhost:3001/api/thoughts/<thoughtId>/reactions
// ADD reaction
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// http://localhost:3001/api/thoughts/<thoughtId>/reactions/<reactionId>
// REMOVE reaction
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;