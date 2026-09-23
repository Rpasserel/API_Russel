var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require ('cors');
var path = require ('path');

var indexRouter = require('./routes/index');
var mongodb = require('./db/mongo');
var usersRouter = require('./routes/users');
var catwaysRouter = require('./routes/catways');
var authRouter = require('./routes/auth');

mongodb.initClientDbConnection();

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({
    exposedHeaders: ['Authorization'],
    origin: '*'
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/catways', catwaysRouter);
app.use(function(req,res,next) {
    res.status(404).json({name: 'API', version: '1.0', status: 404, message: 'not found'});
});

module.exports = app;
