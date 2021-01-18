"use strict";

var jwt = require('jsonwebtoken');

var User = require('./../models/user.model');

var catchAsync = require('./../utils/catchAsync');

var AppError = require('./../utils/appError');

var sendEmail = require('./../utils/sendEmail');

var crypto = require('crypto');

var signToken = function signToken(id) {
  return jwt.sign({
    id: id
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

var sendToken = function sendToken(user, statusCode, res) {
  var token = user.getSignedJwtToken();
  res.status(statusCode).json({
    sucess: true,
    token: token
  });
};

exports.signup = catchAsync(function _callee(req, res, next) {
  var newUser, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
          }));

        case 2:
          newUser = _context.sent;
          token = signToken(newUser._id);
          res.status(201).json({
            status: 'success',
            token: token,
            data: {
              user: newUser
            }
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.login = catchAsync(function _callee2(req, res, next) {
  var _req$body, username, password, user, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password; //1) Check if username and password exist

          if (!(!username || !password)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", next(new AppError('Please provide Username and Passowrd!', 400)));

        case 3:
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            username: username
          }).select('+password'));

        case 6:
          user = _context2.sent;
          _context2.t0 = !user;

          if (_context2.t0) {
            _context2.next = 12;
            break;
          }

          _context2.next = 11;
          return regeneratorRuntime.awrap(user.correctPassword(password, user.password));

        case 11:
          _context2.t0 = !_context2.sent;

        case 12:
          if (!_context2.t0) {
            _context2.next = 14;
            break;
          }

          return _context2.abrupt("return", next(new AppError('Invalid Credentials', 401)));

        case 14:
          //3) If everything is ok, send token  to client
          token = signToken(user._id);
          sendToken(user, 200, res);
          _context2.next = 21;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t1 = _context2["catch"](3);
          next(_context2.t1);

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 18]]);
});
exports.forgotpassword = catchAsync(function _callee3(req, res, next) {
  var email, user, resetToken, resetUrl, message;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          email = req.body.email;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context3.sent;

          if (user) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", next(new AppError("Email could not be sent", 404)));

        case 7:
          resetToken = user.getResetPasswordToken();
          _context3.next = 10;
          return regeneratorRuntime.awrap(user.save());

        case 10:
          resetUrl = "http://localhost:8000/users/resetpassword/".concat(resetToken);
          message = "\n            <h1> You have requested a password reset </h1>\n            <p>Please go to this link to reset your password</p>\n            <a href=".concat(resetUrl, " clicktracking=off>").concat(resetUrl, "</a>\n            ");
          _context3.prev = 12;
          _context3.next = 15;
          return regeneratorRuntime.awrap(sendEmail({
            to: user.email,
            subject: "Password Reset Request",
            text: message
          }));

        case 15:
          res.status(200).json({
            success: true,
            data: "Email Sent"
          });
          _context3.next = 25;
          break;

        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](12);
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;
          _context3.next = 24;
          return regeneratorRuntime.awrap(user.save());

        case 24:
          return _context3.abrupt("return", next(new AppError("Email could not be sent", 500)));

        case 25:
          _context3.next = 30;
          break;

        case 27:
          _context3.prev = 27;
          _context3.t1 = _context3["catch"](1);
          next(_context3.t1);

        case 30:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 27], [12, 18]]);
});

exports.resetpassword = function _callee4(req, res, next) {
  var resetPasswordToken, user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            resetPasswordToken: resetPasswordToken,
            resetPasswordExpire: {
              $gt: Date.now()
            }
          }));

        case 4:
          user = _context4.sent;

          if (user) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", next(new ErrorResponse("Invalid Token", 400)));

        case 7:
          user.password = req.body.password;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;
          _context4.next = 12;
          return regeneratorRuntime.awrap(user.save());

        case 12:
          res.status(201).json({
            success: true,
            data: "Password Updated Success",
            token: user.getSignedJwtToken()
          });
          _context4.next = 18;
          break;

        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](1);
          next(_context4.t0);

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 15]]);
};