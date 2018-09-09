'use strict';
const passport = require('passport');
const router = require('express').Router();
const permission = require('../services/permission');
const flashAlerts = require('../services/flashAlerts');

router.get('/', function (req, res) {
    let alerts = flashAlerts(req.flash());
    if (alerts.length) {
        res.render('account', {
            alerts: alerts
        });
    } else {
        res.render('account');
    }
});

router.get('/connect/google', passport.authenticate('connect-google', {
    scope: ['profile']
}));

router.get('/connect/google/callback', passport.authenticate('connect-google', {
    successRedirect: '/panel/account',
    failureRedirect: '/panel/account',
    failureFlash: true
}));

router.get('/connect/facebook', passport.authenticate('connect-facebook', {
    scope: 'public_profile'
}));

router.get('/connect/facebook/callback', passport.authenticate('connect-facebook', {
    successRedirect: '/panel/account',
    failureRedirect: '/panel/account',
    failureFlash: true
}));

module.exports = router;
