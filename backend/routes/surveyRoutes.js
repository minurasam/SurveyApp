const router = require('express').Router();
let Survey = require('../models/survey.model');


router.route('/:project_id').get((req, res) => {
    Survey.findById(req.params.project_id)
        .then(surveys => res.json(surveys))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create/:project_id').post((req, res) => {
    const JSONdata = req.body.JSONdata;
    const projectId = req.params.project_id;

    const newSurvey = new Survey({
        JSONdata,
        projectId
    });

    newSurvey.save()
    .then(() => res.json('Survey Created!'))
    .catch(err => res.status(400).json('Error: ' + err));
});




module.exports = router;