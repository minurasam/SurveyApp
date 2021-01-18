"use strict";

var Project = require('../models/project.model');

var catchAsync = require('../utils/catchAsync');

exports.getAllProjects = catchAsync(function _callee(req, res, next) {
  var projects;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Project.find());

        case 2:
          projects = _context.sent;
          // Send Response
          res.status(200).json({
            status: 'success',
            results: projects.length,
            data: {
              projects: projects
            }
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});