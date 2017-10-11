var Business = require('../models/business/business.model');// get our mongoose model
var mongoose = require('mongoose');
var _ = require("underscore"); //using this model to whole application



//create the user resgister
exports.addBusiness = function (req, res) {
    // console.log('business');
    var GstinArray = [];
    var GstinObject = {
        _id: "",
        gstin: "",
        displayName: ""
    };

    _.each(req.body.gstins, function (gstins) {
        GstinObject = {};
        GstinObject._id = mongoose.Types.ObjectId()
        GstinObject.gstin = gstins.gstin
        GstinObject.displayName = gstins.displayName
        GstinArray.push(GstinObject);
    });

    //   console.log(mongoose.Types.ObjectId(req.body.userId));

    // create a user
    var saveBusiness = new Business({
        _id: mongoose.Types.ObjectId(),
        businessName: req.body.businessName,
        pan: req.body.pan,
        logo: req.body.logo,
        userId: mongoose.Types.ObjectId(req.body.userId),
        isActive: true,
        isDeleted: false,
        gstins: GstinArray
    });

    // console.log(saveBusiness);

    saveBusiness.save(function (err) {

        if (err) {
            //  console.log(err);
            return res.json({ success: false });
        }

        Business.findOne(mongoose.Types.ObjectId(saveBusiness._id), function (err, result) {
            if (err) throw err;
            // console.log(result);
            return res.status(200).json(result);
        });
    });

};

// Display list of all business
exports.businessList = function (req, res) {
    //console.log('call api');
    Business.find({ userId: mongoose.Types.ObjectId(req.body.userId) }, function (err, business) {
        if (err) {
            return res.json({ err: err });
        }
        console.log(business);
        return res.status(200).json(business);
    });
};

//get business by id
exports.businessById = function (req, res) {
    //  console.log(mongoose.Types.ObjectId(req.params.businessId));
    Business.find({ _id: mongoose.Types.ObjectId(req.params.businessId), userId: mongoose.Types.ObjectId(req.body.userId) }, function (err, business) {
        if (err) {
            return res.json({ err: err });
        }
        return res.status(200).json(business);
    });
};

//update business
exports.updateBusienss = function (req, res) {
    // console.log(req.body);
    // console.log(mongoose.Types.ObjectId(req.body.id));
    Business.find({ _id: mongoose.Types.ObjectId(req.body.id), userId: mongoose.Types.ObjectId(req.body.userId) }, function (err, business) {
        if (err) {
            return res.json({ err: err });
        }

        var updateBusiness = business[0];
        //   console.log(business[0]);
        updateBusiness.businessName = req.body.businessName;
        updateBusiness.pan = req.body.pan;
        updateBusiness.logo = req.body.logo;
        updateBusiness.gstins = [];

        var GstinArray = [];
        var GstinObject = {
            _id: "",
            gstin: "",
            displayName: ""
        };

        _.each(req.body.gstins, function (gstins) {
            GstinObject = {};
            GstinObject._id = mongoose.Types.ObjectId()
            GstinObject.gstin = gstins.gstin
            GstinObject.displayName = gstins.displayName
            GstinArray.push(GstinObject);
        });

        updateBusiness.gstins = GstinArray;

        //update the business
        updateBusiness.save(function (err) {
            if (err)
                res.send(err);

            Business.findOne(mongoose.Types.ObjectId(req.body.id), function (err, result) {
                if (err) throw err;

                //console.log(result);
                return res.status(200).json(result);
            });
        });
    });
};

//remove business
exports.removeBusiness = function (req, res) {
    console.log(req.params.businessId);
    Business.remove({
        _id: req.params.businessId
    }, function (err) {
        if (err)
            return res.send(err);

        return res.status(200).json({ message: 'Successfully deleted' });
    });
};

//add and update gstin
exports.updateGstinBusienss = function (req, res) {
    // console.log(mongoose.Types.ObjectId(req.params.businessId));

    Business.find({
        _id: mongoose.Types.ObjectId(req.params.businessId), userId: mongoose.Types.ObjectId(req.body.userId)
    }, function (err, business) {
        if (err) {
            return res.json({ err: err });
        }

        var updateBusiness = business[0];
        var updateGstinBusinessData = _.find(updateBusiness.gstins, function (gstin) {
            return gstin._id == req.body.id;
        });

        if (updateGstinBusinessData) {
            updateGstinBusinessData.gstin = req.body.gstin;
            updateGstinBusinessData.displayName = req.body.displayName;
        }
        else {
            var GstinObject = {};
            GstinObject._id = mongoose.Types.ObjectId();
            GstinObject.gstin = req.body.gstin;
            GstinObject.displayName = req.body.displayName;
            updateBusiness.gstins.push(GstinObject);
        }

        //update the business
        updateBusiness.save(function (err) {
            if (err)
                res.send(err);

            Business.findOne(mongoose.Types.ObjectId(req.params.businessId), function (err, result) {
                if (err) throw err;

                return res.status(200).json(result);
            });
        });
    });
};

//remove gstin
exports.removeGstinBusienss = function (req, res) {
    //console.log(mongoose.Types.ObjectId(req.params.businessId));

    Business.find({
        _id: mongoose.Types.ObjectId(req.params.businessId), userId: mongoose.Types.ObjectId(req.body.userId)
    }, function (err, business) {
        if (err) {
            return res.json({ err: err });
        }

        var updateBusiness = business[0];
        var updateGstinBusinessData = _.find(updateBusiness.gstins, function (gstin) {
            return gstin._id == req.params.gstinId;
        });

        updateBusiness.gstins = _.reject(updateBusiness.gstins, function (gstin) { return gstin._id == req.params.gstinId; });

        //update the business
        updateBusiness.save(function (err) {
            if (err)
                res.send(err);

            return res.status(200).json({ business: updateBusiness });
        });
        return res.status(200);
    });
};