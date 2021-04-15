const { User } = require('../models');
const chalk = require('chalk');

const userController = {

    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUsers => res.json(dbUsers))
            .catch(err => {
                console.log(chalk.red(err));
                res.status(400).json
            });
    },

    getOneUser({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
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

    createUser({ body }, res) {
        User.create(body)
            .then(dbUser => res.json(dbUser))
            .catch(err => {
                console.log(chalk.red(err));
                res.status(400).json(err);
            })
    }
}

module.exports = userController;