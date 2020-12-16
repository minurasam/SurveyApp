const User = require('./../models/user.model');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    // Send Response
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
        
    });
});

exports.getUser = (req, res) =>{
    User.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.createUser = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};

exports.updateUser = (req, res) =>{
    var profilePic = req.file.path;
    User.findById(req.params.id)
        .then(users => {
            users.name = req.body.name;
            users.username = req.body.username;
            users.profileImage = req.body.profilePic;
    
            users.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
};

exports.deleteUser = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};