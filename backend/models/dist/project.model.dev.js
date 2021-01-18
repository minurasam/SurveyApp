"use strict";

var mongoose = require('mongoose'); //name, username, email, password, passwordconfirm 


var projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: false
  }
});
var Project = mongoose.model('Project', projectSchema);
module.exports = Project;