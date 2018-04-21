let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  email: String,
  password: String,
  name: String,
  address: String
});

module.exports = mongoose.model('User', userSchema);