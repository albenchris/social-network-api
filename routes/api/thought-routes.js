const router = require('express').Router();
const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    removeThought
} = require('../../controllers/thought-controllers');

// http://localhost:3001/api/thoughts/
// GET all, CREATE
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// http://localhost:3001/api/thoughts/<thoughtId>
// GET one, UPDATE, REMOVE
// ADD reaction
router
    .route('/:thoughtId')
    .get(getOneThought)
    .put(updateThought)
    .delete(removeThought);

// router
//     .route('/:userId/:thoughtId')
//     .delete(removeThought);

// http://localhost:3001/api/thoughts/<thoughtId>/<reactionId>
// ADD or REMOVE reaction
router
    .route('/:id/:reactionId')
    // .put()
    // .delete()

module.exports = router;