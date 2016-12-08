var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Note = require('../models/notes');

// get all notes descending
router.get('/', function(req, res, next){
  console.log('In notes get request');
  Note.find({}).sort({createdAt: -1}).exec(function(err, notes){
    if(err){
      next();
    }
    else{
      res.json({notes: notes}); 
    }
  }) 
});

// get user's notes
router.post('/', function(req, res, next){
  console.log('In notes post request');
  Note.find({author: req.body.author })
      .sort({createdAt: -1})
      .exec(function(err, notes){
        if(err){
          next();
        }
        else{
          res.json({notes: notes}); 
        }
      }) 
});

module.exports = router;
