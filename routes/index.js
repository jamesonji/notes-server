var express = require('express');
var router = express.Router();
var Note = require('../models/notes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ text: 'This is a text' });
});

router.post('/', function (req, res) {
  res.json({text: 'POST request to the homepage'});
  console.log(req.body.title);
  var note = new Note({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  });
  
  note.save(function(err, note){
    if(err){
      next();
    } else{
      console.log('Your note is saved');
    }
  });
})

module.exports = router;
