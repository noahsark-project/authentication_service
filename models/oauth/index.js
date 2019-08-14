const mongoose = require('mongoose');
const OAuthAccessToken = require('./OAuthAccessToken');
const OAuthAuthorizationCode = require('./OAuthAuthorizationCode');
const OAuthClient = require('./OAuthClient');
const OAuthRefreshToken = require('./OAuthRefreshToken');
const OAuthScope = require('./OAuthScope');



module.exports = {
  OAuthAccessToken,
  OAuthAuthorizationCode,
  OAuthClient,
  OAuthRefreshToken,
  OAuthScope,
};
