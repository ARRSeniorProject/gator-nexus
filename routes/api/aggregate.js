const express = require('express');
const router = express.Router();
const Persona = require('../../models/Persona');

router.get('/', (req, res) => {
    Persona.find()
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error' + err));
});

module.exports = router;