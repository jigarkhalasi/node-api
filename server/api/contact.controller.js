var Contact = require('../models/contact/contact.model');// get our mongoose model
var mongoose = require('mongoose');



//create the contact
exports.addContact = function (req, res) {
    console.log('contact');

    // create a contact
    var saveContact = new Contact({
        _id: mongoose.Types.ObjectId(),
        businessId: mongoose.Types.ObjectId(req.params.businessId),
        name: req.body.name,
        pan: req.body.pan,
        gstin: req.body.gstin,
        contactPerson: req.body.contactPerson,
        mobile: req.body.mobile,
        state: req.body.state,
        address: req.body.address,
        pinCode: req.body.pinCode,
        city: req.body.city,
        email: req.body.email,
        landline: req.body.landline,
        country: req.body.country,
        isActive: true,
        isDeleted: false
    });

    saveContact.save(function (err) {

        if (err) {
            console.log(err);
            return res.json({ success: false });
        }
        console.log('completed contact!!');
        return res.status(200).send(saveContact);
    });

};

// Display list of all contact
exports.contactList = function (req, res) {
    console.log('call api');
    Contact.find({ businessId: mongoose.Types.ObjectId(req.params.businessId) }, function (err, contacts) {
        if (err) {
            return res.json({ err: err });
        }
        return res.status(200).json(contacts);
    });
};

//get contact by id
exports.contactById = function (req, res) {
    console.log(mongoose.Types.ObjectId(req.params.contactId));
    Contact.find({ _id: mongoose.Types.ObjectId(req.params.contactId) }, function (err, contact) {
        if (err) {
            return res.json({ err: err });
        }
        console.log(contact[0]);
        return res.status(200).json(contact[0]);
    });
};

//update Contact
exports.updateContact = function (req, res) {
    console.log(mongoose.Types.ObjectId(req.body.id));
    Contact.find({ _id: mongoose.Types.ObjectId(req.body.id) }, function (err, contacts) {
        if (err) {
            return res.json({ err: err });
        }

        var contact = contacts[0];

        contact.name = req.body.name;
        contact.pan = req.body.pan;
        contact.gstin = req.body.gstin;
        contact.contactPerson = req.body.contactPerson;
        contact.mobile = req.body.mobile;
        contact.state = req.body.state;
        contact.address = req.body.address;
        contact.pinCode = req.body.pinCode;
        contact.city = req.body.city;
        contact.email = req.body.email;
        contact.landline = req.body.landline;
        contact.country = req.body.country;

        //update the Contact
        contact.save(function (err) {
            if (err)
                res.send(err);

            return res.status(200).json({ contact: contact });
        });
    });
};

//remove Contact
exports.removeContact = function (req, res) {
    Contact.remove({
        _id: mongoose.Types.ObjectId(req.params.contactId)
    }, function (err) {
        if (err)
            return res.send(err);

        return res.status(200).json({ message: 'Successfully deleted' });
    });
};
