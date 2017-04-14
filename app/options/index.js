const config = require('../config');
const session = require('express-session');
var MemoryStore = require('session-memory-store')(session);
const options = {
    express_validator: {
        errorFormatter: function(param, msg, value) {
            var namespace = param.split('.')
                , root = namespace.shift()
                , formParam = root;

            while (namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }
            return {
                param: formParam,
                msg: msg,
                value: value
            };
        }
    },
    express_session: {
        secret: config.express_session_key,
        resave: true,
        saveUninitialized: true,
        store: new MemoryStore()
    },
    body_parser_urlencode: {
        extended: true
    }
};

module.exports = options;