var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET login page. */
router.get('/login', function (req, res) {
    res.locals.layout = 'layouts/plain';
    // Display the Login page with any flash message, if any
    res.render('pages/login', { message: req.flash('message') });
});

/* Handle Login POST */
router.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

/* GET Registration Page */
router.get('/signup', function (req, res) {
    res.locals.layout = 'layouts/plain';
    res.render('pages/register', { message: req.flash('message') });
});

/* Handle Registration POST */
router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signout', function (req, res) {
    req.logout();
    if (!req.session) {
        req.session.destroy(function (err) {
            res.redirect('/login');
        });
    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;