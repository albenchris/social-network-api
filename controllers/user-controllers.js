const { User, Thought } = require('../models');
const chalk = require('chalk');

const userController = {

    // GET all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then(dbUsers => res.json(dbUsers))
            .catch(err => {
                console.log(chalk.red(err));
                res.status(400).json
            });
    },

    // GET one user
    getOneUser({ params }, res) {
        User.findOne({ _id: params.id })
            .select('-__v')
            .then(dbUser => {
                if (!dbUser) return res.status(404).json({ message: 'No user found with this id!' });

                res.json(dbUser);
            })
            .catch(err => {
                console.log(chalk.red(err));
                res.status(400).json(err);
            });
    },

    // CREATE user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUser => res.json(dbUser))
            .catch(err => {
                console.log(chalk.red(err));
                res.status(400).json(err);
            });
    },

    // UPDATE user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
            .select('-__v')
            .then(dbUser => {
                if (!dbUser) return res.statue(404).json({ message: 'No user found with this id!' });

                res.json(dbUser);
            })
            .catch(err => {
                console.log(chalk.red(err));
                res.status(400).json(err);
            });
    },

    // DELETE user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .select('-__v')
            .then(dbUser => {
                if (!dbUser) return res.statue(404).json({ message: 'No user found with this id!' });

                // FOR FUTURE UPDATE
                // when USER deleted, remove all THOUGHTS created by the USER
                console.log(chalk.cyan(dbUser.thoughts));
            
                res.json(dbUser);
            })
            .catch(err => {
                console.log(chalk.red(err));
                res.status(400).json(err);
            });
    },


    // ================== FRIENDS ==================================================================================

    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $addToSet: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUser => {
                if (!dbUser) return res.statue(404).json({ message: 'No user found with this id!' });

                res.json(dbUser);
            })
            .catch(err => {
                console.log(chalk.red(err));
                res.status(400).json(err);
            });
    },

    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUser => {
                if (!dbUser) return res.statue(404).json({ message: 'No user found with this id!' });

                res.json(dbUser);
            })
            .catch(err => {
                console.log(chalk.red(err));
                res.status(400).json(err);
            });
    }

}

// FOR FUTURE UPDATE
// when USER deleted, remove all THOUGHTS created by the USER
const removeUserThoughts = (thoughtId) => {
    Thought.findOneAndDelete({ _id: thoughtId });
};

module.exports = userController;