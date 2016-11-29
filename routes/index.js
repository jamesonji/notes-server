var express = require('express');
var router = express.Router();
var Note = require('../models/notes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ text: 'This is a text' });
});

/* GET notes list */
router.get('/index', function(req, res, next) {
  // res.json({ text: 'This is a text' });
  var Person = mongoose.model('Person', yourSchema);

  // find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
  Person.findOne({ 'name.last': 'Ghost' }, 'name occupation', function (err, person) {
    if (err) return handleError(err);
    console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation) // Space Ghost is a talk show host.
  })
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
