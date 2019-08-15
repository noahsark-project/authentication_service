
const userDAO = require('../daos/userDAO');
const encrypt = require('noahsark-common/libs/utils/encrypt');
const DuplicatedError = require('noahsark-common/libs/errors/DuplicatedError');

function UserController(){
    this.create = async function(username, password,scope){
        const isUsernameExisted = await userDAO.isExisted('username',username);
        if(isUsernameExisted){
            throw new DuplicatedError('username exists');
        }
        const user = {'username': username, 'password':encrypt.sha256(password),'scope':scope};
        try{
            const newUser = await userDAO.create(user);
            delete newUser['password'];
            return newUser;
        }catch(e){
            console.error(e);
            throw e;
        }
    };
    this.getUser = async function(username,password){
        try{
            let user = await userDAO.findOne({'username':username});
            if(user){
                let encodePwd = encrypt.sha256(password);
                if(user.password === encodePwd){
                    delete user['password'];
                    return user;
                }
            }
            return null;
        }catch(e){
            console.error(e);
            throw e;
        }
        
    }
}

module.exports = new UserController();