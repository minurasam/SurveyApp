"use strict";

var User = require('./../models/user.model');

var catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(function _callee(req, res, next) {
  var users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.find());

        case 2:
          users = _context.sent;
          // Send Response
          res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
              users: users
            }
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});

exports.getUser = function (req, res) {
  User.findById(req.params.id).then(function (users) {
    return res.json(users);
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
};

exports.createUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

exports.updateUser = function (req, res) {
  var profilePic = req.file.path;
  User.findById(req.params.id).then(function (users) {
    users.name = req.body.name;
    users.username = req.body.username;
    users.profileImage = req.body.profilePic;
    users.save().then(function () {
      return res.json('User updated!');
    })["catch"](function (err) {
      return res.status(400).json('Error: ' + err);
    });
  });
};

exports.deleteUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};