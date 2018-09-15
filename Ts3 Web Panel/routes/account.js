'use strict';
const passport = require('passport');
const router = require('express').Router();
const permission = require('../services/permission');
const User = require('../sequelize').models.user;
const bcrypt = require('bcrypt');
const validator = require('validator');

router.get('/', function (req, res) {
    res.render('account', {
        google: req.user.googleDisplayName,
        facebook: req.user.facebookDisplayName
    });
});

router.post('/password', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (!validator.isLength(req.body.password, { min: 4, max: 16 })) {
        res.send(JSON.stringify({
            succes: false,
            error: 'Hasło musi mieć od 4 do 16 znaków.'
        }));
    }
    bcrypt.hash(req.body.password, 10).then(hash => {
        User.findById(1).then(user => {
            user.update({
                password: hash
            }).then(() => {
                res.send(JSON.stringify({
                    succes: true,
                    error: null
                }));
            }).catch(err => {
                res.send(JSON.stringify({
                    succes: false,
                    error: err
                }));
            });
        }).catch(err => {
            res.send(JSON.stringify({
                succes: false,
                error: err
            }));
        });
    }).catch(err => {
        res.send(JSON.stringify({
            succes: false,
            error: err
        }));
    });
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
