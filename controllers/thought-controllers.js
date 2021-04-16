const { User, Thought } = require('../models');
const chalk = require('chalk');

const thoughtController = {

    // GET all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughts => res.json(dbThoughts))
            .catch(err => {
                console.log(chalk.red(err));
                res.status(400).json(err);
            });
    },

    // GET one thought
    getOneThought({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .then(dbThought => {
                if (!dbThought) return res.status(404).json({ message: 'No thought found with this id!' });

                res.json(dbThought);
            })
            .catch(err => {
                console.log(chalk.red(err));
                res.status(400).json(err);
            });
    },

    // CREATE thought
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id }},
                    { new: true }
                );
            })
            // .populate({
            //     path: 'thoughts',
            //     select: '-__v'
            // })
            // .select('-__v')
            .then(dbUser => {
                if (!dbUser) return res.status(404).json({ message: 'No user found with this id!' });
                
                res.json(dbUser);
            })
            .catch(err => {
                console.log(chalk.red(err));
                res.json(err);
            });
    },

    // UPDATE thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            body,
            { new: true, runValidators: true }
        )
            .then(dbThought => {
                if (!dbThought) return res.status(404).json({ message: 'No thought found with this id!' });

                res.json(dbThought);
            })
            .catch(err => {
                console.log(chalk.red(err));
                res.json(err);
            });
    },

    // DELETE thought
    removeThought({ params, body }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(removedThought => {
                if (!removedThought) return res.status(404).json({ message: 'No thought found with this id!' });

                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUser => {
                if (!dbUser) return res.status(404).json({ message: 'No user found with this id!' });

                res.json(dbUser);
            })
            .catch(err => {
                console.log(chalk.red(err));
                res.json(err);
            });
    }


    //============================================================================

    // CREATE reaction


    // DELETE reaction


}

module.exports = thoughtController;