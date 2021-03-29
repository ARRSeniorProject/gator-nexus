const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: { type: String, required: true },
  gender: { type: String },
  major: { type: String, default: "Not Specified" },
  academicstanding: { type: Number, min: 1, max: 6 },
  gpa: { type: Number },
  race: { type: String, default: "Not Specified"},
  internship: { type: Boolean },
  date: { type: Date, default: Date.now }
});

module.exports = Student = mongoose.model('student', StudentSchema);