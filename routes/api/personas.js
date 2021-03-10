const express = require('express');
const router = express.Router();
const Persona = require('../../models/Persona');

router.get('/', (req, res) => {
    res.send('We are on posts');
});

router.post('/', (req, res) => {
    const newPersona = new Persona();
});

router.get('/specific', (req, res) => {
    res.send('We are on specific');
});

module.exports = router;