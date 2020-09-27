const mongoose = require('mongoose');

//name, username, email, password, passwordconfirm 
const projectSchema = new mongoose.Schema({
    title: 
    {
        type: String,
        required: [true, 'Title is required']
    },

    description: 
    {
        type: String, 
        required: true
    },

    startDate:
    {
        type: Date,
        required: true
    },
    endDate:
    {
        type: Date, 
        required: false
    }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;