const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


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

    // passwordConfirm: 
    // {
    //     type: String,
    //     required: [true, 'confirm your password'],
    //     validate: {
    //         //this only works on CREATE and SAVE!!!
    //         validator: function(el){
    //             return el === this.password; // abc === abc is true // abc === xyz is false gives a validatoin error
    //         },
    //         message: 'Passwords do not match'
    //     }
    // },
    resetPasswordToken: String,
    resetPasswordExpire: Date
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

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

userSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
    return resetToken;
}

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hash token (private key) and save to database
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    // Set token expire date
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes
  
    return resetToken;
  };

const User = mongoose.model('User', userSchema);

module.exports = User;