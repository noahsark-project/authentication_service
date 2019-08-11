const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const registryRouter = require('./routers/registryRouter');
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
      url: 'mongodb://127.0.0.1:27017/session', //数据库的地址  student是数据库名
      touchAfter: 24 * 3600 //time period in seconds
    })
  }));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use('/registry', registryRouter);


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


app.listen(8000, err => (err ? console.log('Error happened', err) : console.log('Server is up')));