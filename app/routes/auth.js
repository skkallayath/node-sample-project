var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET login page. */
router.get('/login', function(req, res) {
    res.locals.layout = 'layouts/plain';
    // Display the Login page with any flash message, if any
    res.render('pages/login', { message: req.flash('message') });
});

/* Handle Login POST */
router.post('/login', function(req, res, next) {
    req.checkBody('username', 'Invalid username').notEmpty();
    req.checkBody('password', 'Invalid password').notEmpty();
    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            req.flash('message', 'Invalid input.');
            return res.redirect('/login');
        }
        var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/';
        delete req.session.redirectTo;

        passport.authenticate('login', {
            successRedirect: redirectTo,
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    });
});

/* GET Registration Page */
router.get('/signup', function(req, res) {
    res.locals.layout = 'layouts/plain';
    res.render('pages/register', { message: req.flash('message') });
});

/* Handle Registration POST */
router.post('/signup', function(req, res, next) {
    req.checkBody('username', 'Invalid username').notEmpty().isAlphanumeric();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 5 });
    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            req.flash('message', 'Invalid input.');
            return res.redirect('/signup');
        }
        passport.authenticate('signup', {
            successRedirect: '/',
            failureRedirect: '/signup',
            failureFlash: true
        })(req, res, next);
    });
});

router.get('/signout', function(req, res) {
    req.logout();
    if (!req.session) {
        req.session.destroy(function(err) {
            res.redirect('/login');
        });
    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;