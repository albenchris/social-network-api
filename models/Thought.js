const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction');
const formatDate = require('../utils/formatDate');

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
            get: (value) => formatDate(value)
        },
        username: {
            type: String,
            required: true,
        },
        userId: {
            type: String
        },
        reactions: [ReactionSchema]
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
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;