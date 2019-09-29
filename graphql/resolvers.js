const User = require('../models/user');
const bcrypt = require('bcryptjs');
const validator = require('validator');

module.exports = {
    createUser: async function({ userInput }, req) {
        const errors = [];

        if (!validator.isEmail(userInput.email)) {
            errors.push({message: 'Invalid E-mail.'})
        }
        if (validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, {min: 5})) {
            errors.push({message: 'Password too short!'})
        }
        if (errors.length > 0) {
            const error = new Error('Invalid Input Data');

            throw error;
        }

        const existingUser = await User.findOne({ email: userInput.email });

        if (existingUser) {
            const error = new Error('User already exists.');
            throw error;
        }

        const hashedPassword = await bcrypt.hash(userInput.password, 12);

        const user = new User({
            email: userInput.email,
            name: userInput.name,
            password: hashedPassword,
        });

        const createdUser = await user.save();

        // .doc just contains user data without metadata
        return {
            ...createdUser._doc,
            _id: createdUser._id.toString()
        }

    }
};