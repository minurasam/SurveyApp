const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const AppError = require('./../utils/appError');

exports.protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token) {
        return next(new AppError("Not authorized to access the route", 400));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = user.findById(decoded.id);

        if(!user) {
            return next(new AppError("No user found with this id", 404));
        }

        req.user = user;

        next();
    } catch (error) {
        return next(new AppError("Not authorized to access this route", 401));
    }
}
