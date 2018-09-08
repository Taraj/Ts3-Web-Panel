'use strict';
const router = require('express').Router();
const moment = require('moment');


const Admin = require('../sequelize').models.admin;
const GuestMessage = require('../sequelize').models.guestMessage;
const Ts3User = require('../sequelize').models.ts3User;


function getAdminsList() {
    return new Promise(function (resolve, reject) {
        Admin.findAll().then(admins => {
            Promise.all(admins.map(admin => {
                return new Promise(function (resolve, reject) {
                    admin.getTs3Users({
                        where: {
                            online: true
                        }
                    }).then(ts3Users => {
                        resolve({
                            nickname: admin.nickname,
                            isOnline: ts3Users.length ? true : false,
                            role: admin.role,
                            avatar: admin.avatar
                        });
                    }).catch(err => {
                        reject(err);
                    });
                });
            })).then(adminsList => {
                resolve(adminsList);
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(err);
        });
    });
}

function getServerStats() {
    return new Promise(function (resolve, reject) {
        Ts3User.count().then(uniqueUsers => {
            Ts3User.sum('totalConnectionsTime').then(totalConnectionsTime => {
                Ts3User.min('firstConnection').then(firstVisit => {
                    resolve({
                        uniqueUsers: uniqueUsers,
                        totalConnectionsTime: totalConnectionsTime,
                        visitsPerDay: Math.ceil(uniqueUsers / moment().diff(firstVisit, 'days'))
                    });
                }).catch(err => {
                    reject(err);
                });
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(err);
        }); 
    });
}

router.get('/', function (req, res) {
    getAdminsList().then(adminsList => {
        getServerStats().then(serverStats => {
            res.render('home', { admins: adminsList, stats: serverStats });
        }).catch(err => {
            res.send(err);
        });    
    }).catch(err => {
        res.send(err);
    });
});


router.post('/message', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    GuestMessage.create({
        nickname: req.body.nickname,
        subject: req.body.subject,
        ip: req.ip,
        message: req.body.message,
        date: new Date()
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
});


module.exports = router;
