const mongoose = require('mongoose');
const Project = require('./project.model')

//name, username, email, password, passwordconfirm 
const surveySchema = new mongoose.Schema({
    title: 
    {
        type: String,
        required: [true, 'Title is required']
    },

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