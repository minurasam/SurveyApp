const jwt = require('jsonwebtoken');
const User = require('./../models/user.model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({ 
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(201).json({
        status: 'success',
        token,
        data: 
        {
            user: newUser
        }
    });
});

exports.login = (req, res, next) => {
    const {username, password} = req.body;

    //1) Check if username and password exist
    if(!username || !password) {
        return next(new AppError('Please provide Username and Passowrd!', 400));
    }

    //2) Check if user exists && password is correct
    const user = User.findOne({username});
    //3) If everything is ok, send token  to client
    const token = '';
    res.status(200).json({
        status: 'success',
        token
    });
};