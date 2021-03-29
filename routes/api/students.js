const express = require('express');
const router = express.Router();

// Item Model
const Student = require('../../models/student');

// @route   GET api/students
// @desc    Get All Students
// @access  Public
router.get('/', (req, res) => {
  Student.find()
    .sort({ date: -1 })
    .then(students => res.json(students))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route   POST api/students
// @desc    Create A Student
// @access  Public
router.post('/', (req, res) => {
  const newStudent = new Student({
    name: req.body.name,
    gender: req.body.gender,
    major: req.body.major,
    academicstanding: req.body.academicstanding,
    gpa: req.body.gpa,
    race: req.body.race,
    internship: req.body.internship
  });
  newStudent.save()
    .then(student => res.json(student))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route   GET api/students/update/:id
// @desc    Update A Student
// @access  Public
router.get('/update/:id', (req, res) => {
  Student.findById(req.params.id)
    .then(student => {
      student.name = req.body.name;
      student.gender = req.body.gender;
      student.major = req.body.major;
      student.academicstanding = req.body.academicstanding;
      student.gpa = req.body.gpa;
      student.race = req.body.race;

      student.save()
        .then(() => res.json('Student updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route   DELETE api/students/:id
// @desc    Delete A Student
// @access  Public
router.delete('/:id', (req, res) => {
  Student.findById(req.params.id)
    .then(student => student.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
