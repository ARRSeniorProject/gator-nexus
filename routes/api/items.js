const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/item');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  newItem.save()
    .then(item => res.json(item))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route   GET api/items/update/:id
// @desc    Update An Item
// @access  Public
router.get('/update/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => {
      item.name = req.body.name;

      item.save()
        .then(() => res.json('Item updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route   DELETE api/items/:id
// @desc    Delete An Item
// @access  Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
