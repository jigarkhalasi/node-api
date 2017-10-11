var User = require('../models/user/register.user.model');// get our mongoose model
var GstRate = require('../models/business/gstrates.model');// get our mongoose model
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var crypto = require('crypto'); //using this encryption and decryption password
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');

var nodemailer = require('nodemailer'); //for this module for send the email

var salt;
var hash;
const superSecret = 'gstapi';
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'coh-noreply@cllearworks.com',
        pass: 'a2=V8D9R9'
    }
});

//create the user resgister
exports.register = function (req, res) {
    console.log('register');

    salt = crypto.randomBytes(16).toString('hex');
    console.log(crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha1').toString('hex'));

    // create a user
    var saveUser = new User({
        _id: mongoose.Types.ObjectId(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        passwordHash: crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha1').toString('hex'),
        salt: salt,
        isActive: true,
        createdOn: new Date(),
        updatedOn: new Date(),
        role: 1
    });

    saveUser.save(function (err) {

        if (err) {
            console.log(err);
            return res.json({ success: false });
        }
        console.log('completed regisetr!!');
        return res.status(200).send(saveUser);
    });
};

var fs = require('fs');
exports.jsonfile = function (req, res) {
    console.log('json');
    var obj;
    fs.readFile('C:\\Users\\Jigark\\Desktop\\New folder\\file.json', 'utf8', function (err, data) {
        if (err) console.log(err);
        obj = JSON.parse(data);
        for (var i = 0; i < obj.length; i++) {
            console.log(i);
            console.log(obj.length);
           //create a gstrate model
            var saveGstRate = new GstRate({
                _id: mongoose.Types.ObjectId(),
                Type: obj[i].Type,
                HSNCode: obj[i].HSNCode,
                NameOfCommodity: obj[i].NameOfCommodity,
                GSTRate: obj[i].GSTRate1,
                CESS: obj[i].CESS,
                Note: obj[i].Note
            });

            saveGstRate.save(function (err) {
                if (err) {
                    console.log(err);
                    return res.json({ success: false });
                }
            });
        }       
    });
    return res.status(200).send("success");
};


//check the user login or not
exports.login = function (req, res) {
    // find the user
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            return res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            currentHash = crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64, 'sha1').toString('hex')
            var Isvalid = (currentHash === user.passwordHash) ? true : false;

            console.log(Isvalid);
            // check if password matches
            if (!Isvalid) {
                return res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, superSecret, {
                    expiresIn: "20h"
                });

                // return the information including token as JSON
                return res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
};

exports.forgot = function (req, res) {
    // find the user
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        } else if (user) {

            // if user is found and password is right
            // create a token
            var token = jwt.sign(user, superSecret, {
                expiresIn: Date.now() + 3600000
            });

            //var val = Math.floor(1000 + Math.random() * 9000);
            //console.log(val);

            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            //create the new password
            user.salt = crypto.randomBytes(16).toString('hex');
            user.passwordHash = crypto.pbkdf2Sync(text, user.salt, 1000, 64, 'sha1').toString('hex');

            user.save(function (err) {

                if (err) {
                    return res.status(403);
                }

                var mailOptions = {
                    from: 'coh-noreply@cllearworks.com',
                    to: user.email,
                    subject: 'forgot Password',
                    text: 'This is your new Password :-' + text
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        return res.status(403);
                    } else {
                        return res.status(200);
                    }
                });

            });


        }

    });
};

// Display list of all Users
exports.userList = function (req, res, next) {
    console.log('call api');
    User.find(function (err, users) {
        if (err) {
            return res.send(err);
        }
        //console.log('return api:-' + users);
        return res.status(200).json(users);
    });
};

// Display User by Id
exports.userById = function (req, res) {
    var newuserId = mongoose.Types.ObjectId(req.params.userId);
    console.log(newuserId);
    User.findById(newuserId, function (err, user) {
        if (!err) {
            console.log('get user completed!!');
            return res.status(200).send(user);
        } else {
            return console.log(err);
        }
    });
};

exports.updateUser = function (req, res) {
    var objectUserId = mongoose.Types.ObjectId(req.body.userId);
    console.log(objectUserId);
    User.findById(objectUserId, function (err, user) {
        if (!err) {

            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;

            // save the bear
            user.save(function (err) {
                if (err)
                    res.send(err);

                return res.status(200).json({ success: "update Successfully!!", user: user });
            });

        } else {
            return res.json({ error: err });
        }
    });
};

// Delete User
exports.removeUser = function (req, res) {
    User.remove({
        _id: req.params.userId
    }, function (err) {
        if (err)
            return res.send(err);

        return res.status(200).json({ message: 'Successfully deleted' });
    });
};


//chaneg password
exports.changepassword = function (req, res) {
    var objectUserId = mongoose.Types.ObjectId(req.body.userId);
    User.findById(objectUserId, function (err, user) {
        if (!err) {

            user.salt = crypto.randomBytes(16).toString('hex');
            user.passwordHash = crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64, 'sha1').toString('hex');

            // save the bear
            user.save(function (err) {
                if (err)
                    res.send(err);

                return res.status(200).json({ success: "password updated!!" });
            });

        } else {
            return res.json({ error: err });
        }
    });
};