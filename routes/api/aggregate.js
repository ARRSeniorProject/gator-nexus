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
            let averageGPA = personas.reduce((total, persona) => total + persona.gpa, 0) / personas.length;
            aggregatePersona['gpa'] = averageGPA;
            res.json(aggregatePersona);
        }
    });
    //console.log(allPersonas);
    //.then(data => res.json(data))
    //.catch(err => res.status(400).json('Error' + err));
    //res.send('Aggregate View');
});

module.exports = router;