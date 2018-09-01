'use strict';
const passport = require('passport');
const router = require('express').Router();
const permission = require('../services/permission');

router.get('/', function (req, res) {
    res.redirect('/authorization/login');
});

router.get('/login', permission.isLoggedOut, function (req, res) {
    res.render('authorization/login', { error: req.flash('error') });
});

router.get('/register', permission.isLoggedOut, function (req, res) {
    res.render('authorization/register', { error: req.flash('error')});
});

router.get('/logout', permission.isLoggedIn, function (req, res) {
    req.logout();
    res.render('authorization/logout');
});

router.get('/alreadylogged', permission.isLoggedIn, function (req, res) {
    res.render('authorization/alreadylogged');
});

router.post('/login/local', permission.isLoggedOut, passport.authenticate('login-local', {
    successRedirect: '/',
    failureRedirect: '/authorization/login',
    failureFlash: true,
    badRequestMessage: 'Wszystkie pola muszą być wypełnione.' 

}));
router.post('/register/local', permission.isLoggedOut, passport.authenticate('register-local', {
    successRedirect: '/',
    failureRedirect: '/authorization/register',
    failureFlash: true,
    badRequestMessage: 'Wszystkie pola muszą być wypełnione.' 
}));



module.exports = router;
