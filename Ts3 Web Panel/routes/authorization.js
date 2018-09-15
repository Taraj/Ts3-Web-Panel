'use strict';
const passport = require('passport');
const router = require('express').Router();
const permission = require('../services/permission');


router.get('/', function (req, res) {
    res.redirect('/authorization/login');
});

router.get('/login', permission.isLoggedOut, function (req, res) {
    res.render('login');
});

router.get('/register', permission.isLoggedOut, function (req, res) {
    res.render('register');
});

router.get('/logout', permission.isLoggedIn, function (req, res) {
    req.logout();
    req.flash('success', "Wylogowano pomyślnie.");
    res.redirect('/authorization/login');
});


router.post('/login/local', permission.isLoggedOut, passport.authenticate('login-local', {
    successRedirect: '/panel',
    failureRedirect: '/authorization/login',
    failureFlash: true,
    badRequestMessage: 'Wszystkie pola muszą być wypełnione.'
}));
router.post('/register/local', permission.isLoggedOut, passport.authenticate('register-local', {
    successRedirect: '/panel',
    failureRedirect: '/authorization/register',
    failureFlash: true,
    badRequestMessage: 'Wszystkie pola muszą być wypełnione.'
}));

router.get('/login/google', permission.isLoggedOut, passport.authenticate('login-google', {
    scope: ['profile']
}));

router.get('/login/google/callback', permission.isLoggedOut, passport.authenticate('login-google', {
    successRedirect: '/panel',
    failureRedirect: '/authorization/login',
    failureFlash: true
}));

router.get('/login/facebook', permission.isLoggedOut, passport.authenticate('login-facebook', {
    scope: 'public_profile'
}));

router.get('/login/facebook/callback', permission.isLoggedOut, passport.authenticate('login-facebook', {
    successRedirect: '/panel',
    failureRedirect: '/authorization/login',
    failureFlash: true
}));

module.exports = router;
