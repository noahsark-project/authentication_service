const OauthServer = require('oauth2-server');
const model = require('./oauthModel');

const oauth = new OauthServer({
  model
});
const Request = OauthServer.Request;
const Response = OauthServer.Response;
const usersController = require('../../controllers/userController');


const authenticateHandler = {
  async handle(req, res) {
    if (req.session.user) {
      return req.session.user;
    } else {
      let username = req.body.username;
      let password = req.body.password;
      try {
        let user = await usersController.getUser(username, password);
        if (user) {
          req.session.user = user;
          return req.session.user;
        } else {
          return null;
        }
      }catch(e){
        throw e;
      }

    }
  }
};

module.exports.token = (req, res, next) => {
  const request = new Request(req);
  const response = new Response(res);

  oauth.token(request, response)
    .then((token) => {
      console.log('generated token data', token);
      res.set(response.headers);
      res.json(response.body);
    }).catch(err => next(err));
};

module.exports.authorize = (req, res, next) => {
  const request = new Request(req);
  const response = new Response(res);

  oauth.authorize(request, response, {
    authenticateHandler: authenticateHandler
  }).then((authorizationCode) => {
    // TODO: Here i get a redirect response
    console.log(authorizationCode);
    if (request.method.toLowerCase() === "get") {
      res.status(response.status).set(response.headers).end();
    }
    if (request.method.toLowerCase() === "post") {
      let token = {
        redirectUri: authorizationCode.client.redirectUris[0],
        accessToken: authorizationCode.accessToken,
        accessTokenExpiresAt: authorizationCode.accessTokenExpiresAt
      }
      res.send(token);
    }
  }).catch(err => {
    console.log('login failed');
    next(err);
  });
};

module.exports.authenticate = (req, res, next) => {
  const request = new Request(req);
  const response = new Response(res);

  oauth.authenticate(request, response)
    .then((token) => {
      console.log('token data', token)
      // Request is authorized.
      Object.assign(req, {
        user: token
      });
      next();
    })
    .catch(err => next(err));
};