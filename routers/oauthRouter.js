const express = require('express');
const router = express.Router();
const oauthServer = require('../middlewares/oauth/oauthServer');

router.all('/token', oauthServer.token);

router.get('/authorize', function(req, res, next){
  if(!req.session.user){
    req.session.login = {
      response_type:req.query.response_type,
      client_id:req.query.client_id,
      redirect_uri:req.query.redirect_uri,
      state:req.query.state
    }
    res.redirect('/');
  }else{
    next();
  }
},oauthServer.authorize);

router.post('/authorize', function(req, res,next){
  Object.assign(req.body, req.session.login);
  console.log(req.body);
  next();
},oauthServer.authorize);



module.exports = router;