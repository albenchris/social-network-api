const { Schema, model, Types } = require('mongoose');
const Reaction = require('./Reaction');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: (value) => dateFormat(value)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// virtuals go here
// create virtual for reactionCount

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;