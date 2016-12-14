var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  title: {type: String, trim: true, require: true},
  content: {type:String, trim: true, require: true},
  plaintext: {type:String, trim: true, require: true},
  author:  {type: String, require: true},
}, {
  timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);