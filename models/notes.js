var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// sample schema: 
// var notesSchema = new Schema({
//   title:  String,
//   author: String,
//   body:   String,
//   comments: [{ body: String, date: Date }],
//   date: { type: Date, default: Date.now },
//   hidden: Boolean,
//   meta: {
//     votes: Number,
//     favs:  Number
//   }
// });

var NoteSchema = new Schema({
  title: {type: String, trim: true, require: true},
  content: {type:String, trim: true, require: true},
  author:  {type: String, require: true},
  date: { type: Date, default: Date.now },
}, {
  timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);