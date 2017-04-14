module.exports = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.layout = 'layouts/main';
        return next()
    }
    res.redirect('/login')
};