const express = require('express');
const passport = require('passport');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
var path = require('path');
const config = require('./config');
const options = require('./options');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

const app = express();

mongoose.connect(config.mongoConnectionString);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded(options.body_parser_urlencode));
app.use(bodyParser.json());
app.use(expressValidator(options.express_validator));

app.use(expressLayouts);

app.use(session(options.express_session));

app.use(passport.initialize());
app.use(passport.session());

require('./passport')(passport);

var flash = require('connect-flash');
app.use(flash());

app.use(function(req, res, next) {
    console.log(req.originalUrl);
    next();
});

app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    console.log(req.originalUrl);
    next(err);
});

// development error handler
// will print stacktrace
app.use(function(err, req, res, next) {
    err.status = err.status || 500;
    res.status(err.status);
    console.log(err);
    res.locals.layout = 'layouts/plain';
    if (app.get('env') === 'development') {
        res.render('pages/errorlog', {
            message: err.message,
            error: err
        });
    }
    else {
        res.render('pages/error', {
            message: err.message,
            error: err
        });
    }
});

app.locals.title = 'Node sample app';

module.exports = app;