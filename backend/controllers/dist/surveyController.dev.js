"use strict";

var Survey = require('../models/survey.model');

var catchAsync = require('../utils/catchAsync');

exports.getAllProjects = catchAsync(function _callee(req, res, next) {
  var surveys;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Survey.find());

        case 2:
          surveys = _context.sent;
          // Send Response
          res.status(200).json({
            status: 'success',
            results: surveys.length,
            data: {
              surveys: surveys
            }
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});