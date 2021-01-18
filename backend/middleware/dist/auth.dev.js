"use strict";

var jwt = require('jsonwebtoken');

var User = require('../models/user.model');

var AppError = require('./../utils/appError');

exports.protect = function _callee(req, res, next) {
  var token, decoded, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
          }

          if (token) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", next(new AppError("Not authorized to access the route", 400)));

        case 3:
          _context.prev = 3;
          decoded = jwt.verify(token, process.env.JWT_SECRET);
          user = user.findById(decoded.id);

          if (user) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", next(new AppError("No user found with this id", 404)));

        case 8:
          req.user = user;
          next();
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](3);
          return _context.abrupt("return", next(new AppError("Not authorized to access this route", 401)));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 12]]);
};