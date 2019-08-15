const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const userRouter = require('./routers/userRouter');
const oauthRouter = require('./routers/oauthRouter');
const oauth = require('./middlewares/oauth/oauthServer');
const router = express.Router();

const app = express();

mongoose.connect('mongodb://localhost:27017/noahsark',{useNewUrlParser: true})
.catch(error => {
    console.error(error);
});

app.use(session({
    secret: 'serai-idm',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      url: 'mongodb://127.0.0.1:27017/session',
      touchAfter: 24 * 3600
    })
  }));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());


app.use('/oauth',oauthRouter);
app.use('/api/v1/users', userRouter);

app.get('/secure', oauth.authenticate, (req, res) => {
  res.json({ message: 'Secure data' });
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });


app.listen(8000, err => (err ? console.log('Error happened', err) : console.log('Server is up on 8000')));