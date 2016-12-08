var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Note = require('../models/notes');

router.post('/', function (req, res) {
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
      res.json({note: note})
    }
  });
})

router.put('/:id', function(req, res, next) {
  var id = mongoose.Types.ObjectId(req.params.id);
  Note.findByIdAndUpdate(id, 
    { $set: {title: req.body.title, 
      content: req.body.content }},
      { new: true }, 
      function (err, note) {
        if (err){
          next();
        }
        else{
          res.json({note: note})
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
      res.json({message: 'Removed note'});
      console.log('Note is removed');
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

module.exports = router;
