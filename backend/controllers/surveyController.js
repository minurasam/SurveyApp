const Survey = require('../models/survey.model');
const catchAsync = require('../utils/catchAsync');

exports.getAllProjects = catchAsync(async (req, res, next) => {
    const surveys = await Survey.find();

    // Send Response
    res.status(200).json({
        status: 'success',
        results: surveys.length,
        data: {
            surveys
        }
        
    });
});