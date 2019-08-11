const UserModel = require('../models/userModel');
const BaseDAO = require('noahsark-common/libs/core/baseDAO');
const util = require('util');

function UserDAO(Model){
    BaseDAO.call(this, Model);
}
util.inherits(UserDAO,BaseDAO);

module.exports = new UserDAO(UserModel);