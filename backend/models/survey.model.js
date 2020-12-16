const mongoose = require('mongoose');
const Project = require('./project.model')
const Schema = mongoose.Schema

//name, username, email, password, passwordconfirm 
const surveySchema = new mongoose.Schema({
    JSONdata: 
    {
        type: JSON, 
        required: true
    },

    projectId:
    {
        type: Schema.Types.ObjectId,
        ref: Project
    }
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;