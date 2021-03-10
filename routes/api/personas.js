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
    const newPersona = new Persona({
        name: req.body.name,
        age: req.body.age
    });

    newPersona.save()
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => {
    Persona.remove({_id: req.params.id})
    .then(() => res.json({success: true}))
    .catch(() => res.status(404).json({success: false}));
});

router.patch('/:id', (req, res) => {
    Persona.updateOne({_id: req.params.id}, 
        {$set: {name: req.body.name}})
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

module.exports = router;