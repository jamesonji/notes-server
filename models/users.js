var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: {type: String, trim: true, require: false},
  lastName: {type:String, trim: true, require: false},
  userName: {type:String, trim: true, require: true, unique: true},
  email: {type:String, trim: true, require: true},
},{
  timestamps: true
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
