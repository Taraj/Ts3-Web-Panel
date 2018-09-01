'use strict';

module.exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/authorization/login');
};

module.exports.isLoggedOut = function (req, res, next) {
    if (!req.isAuthenticated())
        return next();
    res.redirect('/authorization/alreadylogged');
};
