var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Note = require('../models/notes');

router.post('/', function (req, res) {
  res.json({text: req.body.plaintext});
  console.log(req.body.title);
  console.log(req.body);
  var note = new Note({
    title: req.body.title,
    content: req.body.content,
    plaintext: req.body.plaintext,
    author: req.body.author
  });
  
  note.save(function(err, note){
    if(err){
      console.log(err);
      next();
    } else{
      console.log('Your note is saved');
    }
  });
})

router.patch('/:id', function(req, res, next) {
  var id = mongoose.Types.ObjectId(req.params.id);
  Note.findByIdAndUpdate(id, { $set: {title: req.body.title, content: req.body.content }}, { new: true }, function (err, note) {
    if (err){
      next();
    }
    else{
      console.log('Update successfully');
    }
  });
});

router.delete('/:id', function(req, res, next){
  var id = mongoose.Types.ObjectId(req.params.id);
  Note.findByIdAndRemove(id, function(err, note){
    if (err){
      next();
    }
    else{
      console.log('Note is removed');
      res.json({message: 'Removed note'});
    }
  })
});

router.get('/:id', function(req, res, next){
  var id = mongoose.Types.ObjectId(req.params.id);
  Note.findById(id, function(err, note){
    if (err){
      next();
    }
    else{
      res.json({note: note});
    }
  })
});

router.get('/', function(req, res, next){
  Note.find({}).sort({createdAt: -1}).exec(function(err, notes){
    if(err){
      next();
    }
    else{
      res.json({notes: notes}); 
    }
  }) 
});

module.exports = router;
