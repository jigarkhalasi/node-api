'use strict';

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const superSecret = 'gstapi';

//all controllers
const user = require('./api/user.controller'); //user controller
const business = require('./api/business.controller'); //business controller
const contact = require('./api/contact.controller'); //contact controller
const item = require('./api/item.controller'); //contact controller
const invoice = require('./api/invoice.controller'); //contact controller

//token based login and register-----------------------------------------------------
router.post('/v1/register', user.register);
router.post('/v1/login', user.login);
router.post('/v1/forgot', user.forgot);

router.get('/v1/json', user.jsonfile);

// route middleware to verify a token
router.use(function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.authorization || req.query.authorization || req.headers.authorization;//['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, superSecret, function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes

                req.decoded = decoded;
                req.body.userId = decoded._doc._id;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(401).send({
            success: false,
            message: 'No token provided or token was expired'
        });

    }
});

// user ressources
//get all users
router.get('/v1/users', user.userList);
//get by userid
router.get('/v1/users/:userId', user.userById);
//update user
router.put('/v1/users/update', user.updateUser);
//delete the user
router.delete('/v1/users/:userId', user.removeUser);
//delete the user
router.post('/v1/users/:userId/changepassword', user.changepassword);

//business controller
router.get('/v1/business/', business.businessList);
router.post('/v1/business/add', business.addBusiness);
router.get('/v1/business/:businessId', business.businessById);
router.post('/v1/business/update', business.updateBusienss);
router.delete('/v1/business/:businessId', business.removeBusiness);

//gstin
router.post('/v1/business/:businessId/gstin/update', business.updateGstinBusienss);
router.delete('/v1/business/:businessId/gstin/:gstinId', business.removeGstinBusienss);

//contact controller
router.get('/v1/business/:businessId/contact', contact.contactList);
router.post('/v1/business/:businessId/contact/add', contact.addContact);
router.get('/v1/business/:businessId/contact/:contactId', contact.contactById);
router.post('/v1/business/:businessId/contact/update', contact.updateContact);
router.delete('/v1/business/:businessId/contact/:contactId', contact.removeContact);

//item controller
router.get('/v1/business/:businessId/item', item.itemList);
router.post('/v1/business/:businessId/item/add', item.addItem);
router.get('/v1/business/:businessId/item/:itemId', item.itemById);
router.post('/v1/business/:businessId/item/update', item.updateItem);
router.delete('/v1/business/:businessId/item/:itemId', item.removeItem);

//invoice controller
router.get('/v1/gstin/:gstinId/invoice/type/:invoiceType', invoice.invoiceList);
router.post('/v1/gstin/:gstinId/invoice/add', invoice.addInvoice);
router.get('/v1/gstin/:gstinId/invoice/:invoiceId', invoice.invoiceById);
router.post('/v1/gstin/:gstinId/invoice/update', invoice.updateInvoice);
router.delete('/v1/gstin/:gstinId/invoice/:invoiceId', invoice.removeInvoice);

module.exports = router;
