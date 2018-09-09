'use strict';

module.exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    req.flash('warning', "Zaloguj aby kontynuować.");
    res.redirect('/authorization/login');
};

module.exports.isLoggedOut = function (req, res, next) {
    if (!req.isAuthenticated())
        return next();
    req.flash('warning', "Jesteś już zalogowany/a.");
    res.redirect('/panel');
};
