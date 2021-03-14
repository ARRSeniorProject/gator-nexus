const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonaSchema = new Schema({
    hasInternship: {
        type: Boolean
    },
    company: {
        type: String,
        required: false
    },
    major: {
        type: String,
        required: [true, 'Major is required']
    },
    minor: {
        type: String,
        default: "N/A",
        required: false
    },
    gpa: {
        type: Number,
        max: 4.0,
        min: 0.0,
        required: [true, 'GPA is required']
    },
    academicStanding: {
        type: String,
        enum: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Super Senior'],
        required: [true, 'Academic Standing is required']
    },
    skills: {
        type: [String],
        required: [true, 'Specifying at least one skill is required']
    },
    race: {
        type: String,
        enum: ['White', 'Black or African American', 'Hispanic or Latino', 'American Indian or Alaska Native', 'Asian', 'Native Hawaiian or Other Pacific Islander'],
        required: [true, 'Ethnicity is required']
    },
    age: {
        type: Number,
        min: 18,
        required: [true, 'Age is required']
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Non-Binary'],
        required: [true, 'Gender is required']
    },
    householdIncome: {
        type: Number,
        required: [true, 'Household Income is required']
    },
    employmentStatus: {
        type: Number,
        min: 0,
        required: [true, 'Employment Status is required']
    },
    interviewPreparationTime: {
        type: Number,
        min: 0,
        required: [true, 'Interview Preparation Time is required']
    },
    phoneNumber: {
        type: String,
        match: '^\d{3}-\d{3}-\d{4}$',
        required: false
    },
    profilePictureLink: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Persona', PersonaSchema);