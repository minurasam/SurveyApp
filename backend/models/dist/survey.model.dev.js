"use strict";

var mongoose = require('mongoose');

var Project = require('./project.model');

var Schema = mongoose.Schema; //name, username, email, password, passwordconfirm 

var surveySchema = new mongoose.Schema({
  JSONdata: {
    type: JSON,
    required: true
  },
  Info: {
    type: JSON,
    required: true
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: Project
  }
});
var Survey = mongoose.model('Survey', surveySchema);
module.exports = Survey;