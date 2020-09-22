const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

//name, username, email, password, passwordconfirm 
const userSchema = new mongoose.Schema({
    name: 
    {
        type: String,
        required: [true, 'Name is required']
    },

    username: 
    {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: 3
    },

    email: 
    {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },

    photo: String,

    password: 
    {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },

    passwordConfirm: 
    {
        type: String,
        required: [true, 'Confirm your password'],
        validate: {
            //this only works on CREATE and SAVE!!!
            validator: function(el){
                return el === this.password; // abc === abc is true // abc === xyz is false gives a validatoin error
            },
            message: 'Passwords do not match'
        }
    },
}, 
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function(next){
    // Only run this function if password was actually modified
    if(!this.isModified('password')) return next();

    //hashing the password(encryption) with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    
    //delete the confirm password field
    this.passwordConfirm = undefined;
});

const User = mongoose.model('User', userSchema);

module.exports = User;