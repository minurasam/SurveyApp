"use strict";

var router = require('express').Router();

var Project = require('../models/project.model');

router.route('/').get(function (req, res) {
  Project.find().then(function (projects) {
    return res.json(projects);
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
router.route('/add').post(function (req, res) {
  var title = req.body.title;
  var description = req.body.description;
  var startDate = Date.parse(req.body.startDate);
  var endDate = Date.parse(req.body.endDate);
  var newProject = new Project({
    title: title,
    description: description,
    startDate: startDate,
    endDate: endDate
  });
  newProject.save().then(function () {
    return res.json('Project added!');
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
router.route('/:id').get(function (req, res) {
  Project.findById(req.params.id).then(function (projects) {
    return res.json(projects);
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
router.route('/:id')["delete"](function (req, res) {
  Project.findByIdAndDelete(req.params.id).then(function () {
    return res.json('Project deleted.');
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
router.route('/update/:id').post(function (req, res) {
  Project.findById(req.params.id).then(function (projects) {
    projects.title = req.body.title;
    projects.description = req.body.description;
    projects.endDate = Date.parse(req.body.endDate);
    projects.startDate = Date.parse(req.body.startDate);
    projects.save().then(function () {
      return res.json('Project updated!');
    })["catch"](function (err) {
      return res.status(400).json('Error: ' + err);
    });
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
module.exports = router;