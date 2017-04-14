var express = require('express');
var router = express.Router();
var passport = require('passport');

router.use(require('./auth'));

router.use(require('./app'));

module.exports = router;
