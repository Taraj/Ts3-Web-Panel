'use strict';
const router = require('express').Router();
const permission = require('../services/permission');


router.get('/', permission.isLoggedIn, function (req, res) {
    res.render('panel');
});


module.exports = router;
