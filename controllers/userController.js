
const userDAO = require('../daos/userDAO');
const encrypt = require('noahsark-common/libs/utils/encrypt');
const DuplicatedError = require('noahsark-common/libs/errors/DuplicatedError');

function UserController(){
    this.create = async function(username, password){
        const isUsernameExisted = await userDAO.isExisted('email',username);
        if(isUsernameExisted){
            throw new DuplicatedError('username exists');
        }
        const user = {'username': username, 'password':encrypt.sha256(password)};
        try{
            const newUser = await userDAO.create(user);
            return newUser;
        }catch(e){
            throw e;
        }
    };
    this.getUser = async function(username,password){
        try{
            let user = await userDAO.find({'username':username});
            if(user){
                let encodePwd = encrypt.sha256(password);
                if(user.password === encodePwd){
                    return user;
                }
            }
            return null;
        }catch(e){
            throw e;
        }
        
    }
}

module.exports = new UserController();