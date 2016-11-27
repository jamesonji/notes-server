var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ text: 'This is a text' });
});

module.exports = router;
