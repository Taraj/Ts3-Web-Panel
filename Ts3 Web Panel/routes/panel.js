'use strict';
const router = require('express').Router();
const permission = require('../services/permission');
const flashAlerts = require('../services/flashAlerts');


router.get('/', permission.isLoggedIn, function (req, res) {
    let alerts = flashAlerts(req.flash());
    if (alerts.length) {
        res.render('panel', {
            alerts: alerts
        });
    } else {
        res.render('panel');
    }
});


module.exports = router;
