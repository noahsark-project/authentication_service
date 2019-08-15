const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  scope: Array
});

module.exports = mongoose.model('User', UserSchema);
