const mongoose = require('mongoose');
const Schema = mongoose.Schema

//name, username, email, password, passwordconfirm 
const questionSchema = new mongoose.Schema({
    Questiondata: 
    {
        type: JSON, 
        required: true
    },
    QuestionNumber:
    {
        type: String, 
        required: true
    },

});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;