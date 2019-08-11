const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const registryController = require('../controllers/registryController');

router.post('/',
    [
        check('email').isEmail(),
        check('password').isAlphanumeric().isLength({min:6})
    ],async (req, res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try{
            const newUser = await registryController.registry(req.body.email,req.body.password,req.body.nickname);
            res.json(newUser);
        }catch(e){
            if(e.code === 804){
                res.json(e);
            }
        }
    }
);

module.exports = router;