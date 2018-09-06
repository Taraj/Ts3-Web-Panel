'use strict';
const router = require('express').Router();
const admin = require('../sequelize').models.admin;
const guestMessage = require('../sequelize').models.guestMessage;

let stats = {
    uniqueUsers: 56554,
    totalConnectionsTime: 15255,
    visitsPerDay: 5542
};

function isOnline(uid) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, 1, true);
    });
}



function adminsList() {
    return new Promise(function (resolve, rejest) {
        admin.findAll().then(admins => {
            let promises = admins.map(val => {
                return new Promise(function (resolve, rejest) {
                    isOnline(val.dataValues.uid).then(online => {
                        resolve({
                            nickname: val.dataValues.nickname,
                            isOnline: online,
                            role: val.dataValues.role,
                            avatar: val.dataValues.avatar
                        });
                    }).catch(err => {
                        rejest(err);
                    });
                });
            });
            Promise.all(promises).then(val => {
                resolve(val);
            }).catch(err => {
                rejest(err);
            });
        }).catch(err => {
            rejest(err);
        });
    });
}


router.get('/', function (req, res) {
    adminsList().then(admins => {
        res.render('home', { admins: admins, stats: stats });
    }).catch(err => {
        res.send(err);
    });
});

router.post('/message', function (req, res) {
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        succes: false,
        error: "kij z tym"
    }));
});


module.exports = router;
