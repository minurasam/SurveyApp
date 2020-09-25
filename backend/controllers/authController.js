const jwt = require('jsonwebtoken');
const User = require('./../models/user.model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/sendEmail');
const crypto = require('crypto');


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token });
};


exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({ 
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        data: 
        {
            user: newUser
        }
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const {username, password} = req.body;

    //1) Check if username and password exist
    if(!username || !password) {
        return next(new AppError('Please provide Username and Passowrd!', 400));
    }
    try {
    //2) Check if user exists && password is correct
    const user = await User.findOne({username}).select('+password');
    //const correct = await user.correctPassword(password, user.password);

    if(!user || !await user.correctPassword(password, user.password)) {
        return next(new AppError('Invalid Credentials', 401));
    }

    //3) If everything is ok, send token  to client
    const token = signToken(user._id);
    sendToken(user, 200, res);
    } catch (err) {
        next(err)
    }
});

exports.forgotpassword = catchAsync(async(req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({email});

        if(!user) {
            return next(new AppError("Email could not be sent", 404))
        }

        const resetToken = user.getResetPasswordToken();

        await user.save();

        const resetUrl = `http://localhost:8000/users/resetpassword/${resetToken}`;

        const message = `
            <h1> You have requested a password reset </h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
            `

        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message
            });

            res.status(200).json({
                success: true,
                data: "Email Sent"
            });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new AppError("Email could not be sent", 500))
        }

    } catch (error){
        next(error);
    }

});    

exports.resetpassword = async(req, res, next) => {
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
};
