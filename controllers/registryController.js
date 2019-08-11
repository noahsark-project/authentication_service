
const userDAO = require('../daos/userDAO');
const encrypt = require('noahsark-common/libs/utils/encrypt');
const DuplicatedError = require('noahsark-common/libs/errors/DuplicatedError');

function RegisterController(){
    this.registry = async function(email, password, nickname){
        const isEmailExisted = await userDAO.isExisted('email',email);
        if(isEmailExisted){
            throw new DuplicatedError('email exists');
        }
        const isNicknameExisted = await userDAO.isExisted('nickname',nickname);
        if(isNicknameExisted){
            throw new DuplicatedError('nickname exists');
        }
        const user = {'email': email, 'password':encrypt.sha256(password), 'nickname':nickname};
        try{
            const newUser = await userDAO.create(user);
            return newUser;
        }catch(e){
            throw e;
        }
    };
}

module.exports = new RegisterController();