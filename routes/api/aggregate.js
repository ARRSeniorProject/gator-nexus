const express = require('express');
const router = express.Router();
const Persona = require('../../models/Persona');

router.get('/', (req, res) => {
    Persona.find((err, personas) => {
        if(err) {
            res.status(400).json('Error: ' + err);
        }
        else {
            let aggregatePersona = {};
            let academicStandingCount = {
                'Freshman' : 0,
                'Sophomore' : 0,
                'Junior' : 0,
                'Senior' : 0,
                'Super Senior' : 0
            };
            let raceCount = {
                'White' : 0, 
                'Black or African American' : 0, 
                'Hispanic or Latino' : 0, 
                'American Indian or Alaska Native' : 0, 
                'Asian' : 0, 
                'Native Hawaiian or Other Pacific Islander' : 0
            };
            let genderCount = {};
            let averageGPA = personas.reduce((total, persona) => total + persona.gpa, 0) / personas.length;
            let averageAge = personas.reduce((total, persona) => total + persona.age, 0) / personas.length;
            let averageIncome = personas.reduce((total, persona) => total + persona.householdIncome, 0) / personas.length;
            let averageEmploymentStatus = personas.reduce((total, persona) => total + persona.employmentStatus, 0) / personas.length;
            let averageInterviewPreparationTime = personas.reduce((total, persona) => total + persona.interviewPreparationTime, 0) / personas.length;
            aggregatePersona['gpa'] = averageGPA;
            aggregatePersona['age'] = averageAge;
            aggregatePersona['householdIncome'] = averageIncome;
            aggregatePersona['employmentStatus'] = averageEmploymentStatus;
            aggregatePersona['interviewPreparationTime'] = averageInterviewPreparationTime;
            res.json(aggregatePersona);
        }
    });
    //console.log(allPersonas);
    //.then(data => res.json(data))
    //.catch(err => res.status(400).json('Error' + err));
    //res.send('Aggregate View');
});

module.exports = router;