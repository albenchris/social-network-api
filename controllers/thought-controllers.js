const { User, Thought } = require('../models');
const chalk = require('chalk');

const thoughtController = {

    // GET all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .sort({ _id: -1 })
            .then(dbThoughts => res.json(dbThoughts))
            .catch(err => {
                console.log(chalk.red(err));
                res.status(400).json(err);
            });
    },

    // GET one thought
    getOneThought({ params }, res) {
        Thought.findOne({ _id: params.id })
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
            .then(dbThought => res.json(dbThought))
            .catch(err => {
                console.log(chalk.red(err));
                res.json(err);
            });
    },

    // UPDATE thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
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
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThought => {
                if (!dbThought) return res.status(404).json({ message: 'No thought found with this id!' });

                res.json(dbThought);
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