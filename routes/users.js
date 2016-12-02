var express = require('express');
var router = express.Router();
var passport = require('passport');
var session = require('express-session');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', passport.authenticate( 'login', 
                          {successRedirect: '/',
                          failureRedirect: '/login',
                          failureFlash: false })
);
                                    
router.post('/signup', passport.authenticate('signup', {
                                      successRedirect: '/',
                                      failureRedirect: 'http://localhost:3000/login',
                                      failureFlash : false 
                                    }));
module.exports = router;
