const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
    nickname: String,
    create_date: {type: Date, default: Date.now}
});

const UserModel = mongoose.model('User',userSchema);
module.exports = UserModel;