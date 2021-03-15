const express = require('express');
const router = express.Router();
const Persona = require('../../models/Persona');

router.get('/', (req, res) => {
    Persona.find()
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error ' + err));
});

router.get('/:id', (req, res) => {
    Persona.findById(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error ' + err));
});

router.post('/', (req, res) => {
    if(Array.isArray(req.body)) {
        console.log('hello world');
    }
    else {
        let profileSeed = Math.random().toString(36).substr(2, 8);
        let profilePictureLink = `https://avatars.dicebear.com/api/jdenticon/${profileSeed}.svg`
        let hasJob = "company" in req.body;
        let hasContactInfo = ("phoneNumber" in req.body) || ("email" in req.body);
        const newPersona = new Persona({
            hasJob: hasJob,
            company: req.body.company,
            major: req.body.major,
            minor: req.body.minor,
            gpa: req.body.gpa,
            academicStanding: req.body.academicStanding,
            skills: req.body.skills,
            race: req.body.race,
            age: req.body.age,
            gender: req.body.gender,
            householdIncome: req.body.householdIncome,
            employmentStatus: req.body.employmentStatus,
            interviewPreparationTime: req.body.interviewPreparationTime,
            hasContactInfo: hasContactInfo,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            profilePictureLink: profilePictureLink
        });
    
        newPersona.save()
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err));
    }
});

router.delete('/:id', (req, res) => {
    Persona.remove({_id: req.params.id})
    .then(() => res.json({success: true}))
    .catch(() => res.status(404).json({success: false}));
});

router.patch('/:id', (req, res) => {
    Persona.updateOne({_id: req.params.id}, 
        {$set: req.body
            /*{
                company: req.body.company,
                major: req.body.major,
                minor: req.body.minor,
                gpa: req.body.gpa,
                academicStanding: req.body.academicStanding,
                skills: req.body.skills,
                race: req.body.race,
                age: req.body.age,
                gender: req.body.gender,
                householdIncome: req.body.householdIncome,
                employmentStatus: req.body.employmentStatus,
                interviewPreparationTime: req.body.interviewPreparationTime,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                profilePictureLink: req.body.profilePictureLink
            } */
    })
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

module.exports = router;