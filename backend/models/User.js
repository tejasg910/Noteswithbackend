const { default: userEvent } = require('@testing-library/user-event');
const mongoose  = require('mongoose');
//creating the user schema for the saving the data of the user 
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String, 
        unique: true,
        required: true
    },
    password:{
        type: String, 
        required: true
    },
    date:{
        type: Date, 
        default: Date.now
    }
})

const User = mongoose.model('user', UserSchema);

module.exports = User;