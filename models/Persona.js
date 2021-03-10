const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonaSchema = new Schema({
    major: {
        type: String,
        required: true
    },
    minor: {
        type: String,
        default: "N/A",
        required: true
    },
    gpa: {
        type: Number,
        max: 4.0,
        min: 0.0
    },
    age: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Persona', PersonaSchema);