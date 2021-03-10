const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Persona', PersonaSchema);