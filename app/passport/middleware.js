module.exports = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.layout = 'layouts/main';
        return next()
    }
    req.session.redirectTo = req.path;
    res.redirect('/login')
};