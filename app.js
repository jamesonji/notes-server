var express = require('express');
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bCrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy;

// >>>>>> Mongoose >>>>>>
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/reactnotes');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to db reactnotes!');
});

var index = require('./routes/index');
var users = require('./routes/users');
var notes = require('./routes/notes');
var sessions = require('./routes/sessions');

var app = express();

// Use cors to allow outcoming requests
app.use(cors());

// enable passport and session
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: 'Somesecret for testing',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// >>>>>> Passport >>>>>
var User = require('./models/users.js');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({ 'email' : email }, function (err, user) {
      console.log(user);
      if (err) {
        console.log('Login Error:' + err);
        return done(err); 
      }
      if (!user) {
        console.log('Incorrect Email');
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.validPassword(user, password)) {
        console.log('Incorrect password');
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log('Login successful');
      return done(null, user);
    });
  }
));

passport.use('signup', new LocalStrategy( {
    passReqToCallback : true,
    usernameField: 'email'
  },
  function(req, email, password, done) {
    findOrCreateUser = function(){
      // find a user in Mongo with provided username
      console.log('the request is:' + req);
      User.findOne({'email': email}, function (err, user) {
        // In case of any error return
        if (err){
          console.log('Error in SignUp: ' + err);
          return done(err);
        }
        // already exists
        if (user) {
          console.log('User already exists');
          return done(null, false, { message:'User Already Exists' });
        } else {
          // if there is no user with that email
          // create the user
          console.log(req);
          var newUser = new User();
          // set the user's local credentials
          newUser.email = email;
          newUser.password = createHash(password);
          newUser.firstName = req.body.firstName;
          newUser.lastName = req.body.lastName;
          // save the user
          newUser.save(function(err) {
            if (err){
              console.log('Error in Saving user: '+ err);  
              throw err;  
            }
            console.log('User Registration succesful');    
            return done(null, newUser);
          });
        }
      });
    };
    process.nextTick(findOrCreateUser);
  })
);

// Generates hash using bCrypt
var createHash = function(password){
 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};


app.get('/logout', function(req, res){
                                      req.logout();
                                      res.json({message: 'Logged out!'});
                                    });

app.use('/', index);
app.use('/users', users);
app.use('/notes', notes);
app.use('/sessions', sessions);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
