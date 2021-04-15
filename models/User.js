const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Username is required',
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: 'Valid email is required',
            validate: {
                validator: function(input) {
                    return /^\w+([\._-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input);
                },
                message: 'Valid email is required'
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [ this ]
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
// create virtual for User's friendCount

const User = model('User', UserSchema);

module.exports = User;