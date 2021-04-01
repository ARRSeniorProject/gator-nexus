const express = require('express');
const router = express.Router();
const Persona = require('../../models/Persona');

router.get('/', (req, res) => {
    let queryObject = {};
    if(req.query.hasJob != undefined)
        queryObject['hasJob'] = req.query.hasJob === 'true';
    if(req.query.company != undefined)
        queryObject['company'] = req.query.company;
    console.log(queryObject);
    Persona.find(queryObject, (err, personas) => {
        if(err) {
            res.status(400).json('Error: ' + err);
        }
        else {
            console.log(personas.length);
            let aggregatePersona = {};
            let raceCount = {
                'White' : 0, 
                'Black' : 0, 
                'Hispanic or Latino' : 0, 
                'Native American' : 0, 
                'Asian' : 0, 
                'Pacific Islander' : 0,
                'Other' : 0
            };
            let genderCount = {
                'Male' : 0,
                'Female' : 0,
                'Other' : 0
            };
            let majors = {};
            let skills = {};
            let total_skills = personas.map(a => a.skills).flat();
            for(var i = 0; i < personas.length; i++) {
                genderCount[personas[i].gender] = genderCount[personas[i].gender] ? genderCount[personas[i].gender] + 1 : 1;
                raceCount[personas[i].race] = raceCount[personas[i].race] ? raceCount[personas[i].race] + 1 : 1;
                majors[personas[i].major] = majors[personas[i].major] ? majors[personas[i].major] + 1 : 1;
            }
            for(var i = 0; i < total_skills.length; i++)
                skills[total_skills[i]] = skills[total_skills[i]] ? skills[total_skills[i]] + 1 : 1;
            let averageGPA = personas.reduce((total, persona) => total + persona.gpa, 0) / personas.length;
            let averageAge = personas.reduce((total, persona) => total + persona.age, 0) / personas.length;
            let averageIncome = personas.reduce((total, persona) => total + persona.householdIncome, 0) / personas.length;
            let averageEmploymentStatus = personas.reduce((total, persona) => total + persona.employmentStatus, 0) / personas.length;
            let averageInterviewPreparationTime = personas.reduce((total, persona) => total + persona.interviewPreparationTime, 0) / personas.length;
            let averageAcademicStanding = personas.reduce((total, persona) => total + persona.academicStanding, 0) / personas.length;
            aggregatePersona['gpa'] = averageGPA;
            aggregatePersona['age'] = averageAge;
            aggregatePersona['householdIncome'] = averageIncome;
            aggregatePersona['employmentStatus'] = averageEmploymentStatus;
            aggregatePersona['interviewPreparationTime'] = averageInterviewPreparationTime;
            aggregatePersona['academicStanding'] = averageAcademicStanding;
            aggregatePersona['majors'] = majors;
            aggregatePersona['races'] = raceCount;
            aggregatePersona['gender'] = genderCount;
            aggregatePersona['skills'] = skills;
            res.json(aggregatePersona);
        }
    });
});

module.exports = router;