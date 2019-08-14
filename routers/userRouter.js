const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/',
    [
        check('username').isAlphanumeric().isLength({min:3}),
        check('password').isAlphanumeric().isLength({min:6})
    ],async (req, res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try{
            const newUser = await userController.create(req.body.username,req.body.password);
            res.json(newUser);
        }catch(e){
            if(e.code === 804){
                res.json(e);
            }
        }
    }
);

module.exports = router;