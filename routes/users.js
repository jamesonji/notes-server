var express = require('express');
var router = express.Router();
var passport = require('passport');

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
                                      failureRedirect: '/signup',
                                      failureFlash : false 
                                    }));

module.exports = router;
