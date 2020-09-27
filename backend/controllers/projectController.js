const Project = require('../models/project.model');
const catchAsync = require('../utils/catchAsync');

exports.getAllProjects = catchAsync(async (req, res, next) => {
    const projects = await Project.find();

    // Send Response
    res.status(200).json({
        status: 'success',
        results: projects.length,
        data: {
            projects
        }
        
    });
});