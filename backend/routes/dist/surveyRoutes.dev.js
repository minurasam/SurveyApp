"use strict";

var router = require('express').Router();

var Survey = require('../models/survey.model');

router.route('/:project_id').get(function (req, res) {
  Survey.find({
    projectId: req.params.project_id
  }).then(function (surveys) {
    return res.json(surveys);
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
router.route('/runsurvey/:id').get(function (req, res) {
  Survey.findById(req.params.id).then(function (survey) {
    return res.json(survey);
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
router.route('/create').post(function (req, res) {
  var JSONdata = req.body.JSONdata;
  var Info = req.body.Info;
  var projectId = req.body.project_id;
  var newSurvey = new Survey({
    JSONdata: JSONdata,
    Info: Info,
    projectId: projectId
  });
  newSurvey.save().then(function () {
    return res.json('Survey Created!');
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
module.exports = router;