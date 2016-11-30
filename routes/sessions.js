var express = require('express');
var router = express.Router();

router.get('/new', function(req, res, next){
  res.render('sessions/new');
})

router.post('/', passport.authenticate('local', { successRedirect: '/',
                                                  failureRedirect: '/login',
                                                  failureFlash: true }))
module.exports = router;
