var express = require('express');
var router = express.Router();
var middleware = require('../passport/middleware');

router.get('/', middleware, function (req, res) {
    // Display the Login page with any flash message, if any
    res.render('pages/home', { user: req.user });
});

module.exports = router;