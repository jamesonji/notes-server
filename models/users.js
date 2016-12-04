var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bCrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  firstName: {type: String, trim: true },
  lastName: {type:String, trim: true },
  // userName: {type:String, trim: true },
  email: {type:String, trim: true, require: true, unique: true},
  password: {type: String, require: true}
},{
  timestamps: true
});

UserSchema.methods.validPassword = function(user, password){
  // todo: use hashed password using BCrypt or similar
  // return password === this.password;
  return bCrypt.compareSync(password, user.password);
}

var User = mongoose.model('User', UserSchema);

module.exports = User;
