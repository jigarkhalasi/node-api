var Invoice = require('../models/invoice/invoice.model');// get our mongoose model
var InvoiceSequence = require('../models/invoice/invoice-sequence.model');
var mongoose = require('mongoose');
var _ = require("underscore"); //using this model to whole application


//create the invoice
exports.addInvoice = function (req, res) {
    console.log('Invoice');

    InvoiceSequence.findOne({ gstinId: mongoose.Types.ObjectId(req.params.gstinId), code: req.body.invoiceType }, function (err, result) {
        if (err) throw err;
                
        var invoiceSequence = result;
        var invoiceSequenceNo = invoiceSequence.prefix + (invoiceSequence.startNo);
                
        result.startNo = invoiceSequence.startNo + 1;

        // Save invoice sequence no with +1
        result.save(function (err) {
            if (err)
                res.send(err);            
        });  

        var itemArray = [];
        var itemObject = {
            _id: "",
            itemOrdinal: "",
            itemDescription: "",
            itemType: "",
            hsnCode: "",
            qty: 0,
            ratePerItem: 0,
            discount: 0,
            taxableValue: 0,
            cgstPer: 0,
            cgstAmount: 0,
            sgstPer: 0,
            sgstAmount: 0,
            igstPer: 0,
            igstAmount: 0,
            cessPer: 0,
            cessAmount: 0,
            total: 0
        };
    
        _.each(req.body.invoiceDetails, function (i) {
            itemObject = {};
            itemObject._id = mongoose.Types.ObjectId(),
                itemObject.itemOrdinal = i.itemOrdinal,
                itemObject.itemDescription = i.itemDescription,
                itemObject.itemType = i.itemType,
                itemObject.hsnCode = i.hsnCode,
                itemObject.qty = i.qty,
                itemObject.ratePerItem = i.ratePerItem,
                itemObject.discount = i.discount,
                itemObject.taxableValue = i.taxableValue,
                itemObject.cgstPer = i.cgstPer,
                itemObject.cgstAmount = i.cgstAmount,
                itemObject.sgstPer = i.sgstPer,
                itemObject.sgstAmount = i.sgstAmount,
                itemObject.igstPer = i.igstPer,
                itemObject.igstAmount = i.igstAmount,
                itemObject.cessPer = i.cessPer,
                itemObject.cessAmount = i.cessAmount,
                itemObject.total = i.total
            itemArray.push(itemObject);
        });
    
    
        // create a invoice
        var saveInvoice = new Invoice({
            _id: mongoose.Types.ObjectId(),        
            gstinId: mongoose.Types.ObjectId(req.params.gstinId),
            invoiceSequenceNo: invoiceSequenceNo,
            invoiceDate: req.body.invoiceDate,
            invoiceType: req.body.invoiceType,
            reference: req.body.reference,
            dueDate: req.body.dueDate,
            contactId: mongoose.Types.ObjectId(req.body.contactId),
            contactName: req.body.contactName,
            contactGstin: req.body.contactGstin,
            billingAddress: {
                state: req.body.billingAddress.state,
                address: req.body.billingAddress.address,
                pinCode: req.body.billingAddress.pinCode,
                city: req.body.billingAddress.city
            },
            shippingAddress: {
                state: req.body.shippingAddress.state,
                address: req.body.shippingAddress.address,
                pinCode: req.body.shippingAddress.pinCode,
                city: req.body.shippingAddress.city
            },
            placeOfSupply: req.body.placeOfSupply,
            invoiceDetails: itemArray
        });
    
        saveInvoice.save(function (err) {
    
            if (err) {
                console.log(err);
                return res.json({ success: false });
            }
            console.log('completed invoice!!');
    
            Invoice.findOne(mongoose.Types.ObjectId(saveInvoice._id), function (err, result) {
                if (err) throw err;
    
                //console.log(result);
                return res.status(200).json(result);
            });
        });
    });



};

// Display list of all invoices
exports.invoiceList = function (req, res) {
    console.log('call api');
    Invoice.find({ gstinId: mongoose.Types.ObjectId(req.params.gstinId), invoiceType: req.params.invoiceType }, function (err, invoices) {
        if (err) {
            return res.json({ err: err });
        }
        return res.status(200).json(invoices);
    });
};

//get invoice by id
exports.invoiceById = function (req, res) {
    console.log(mongoose.Types.ObjectId(req.params.invoiceId));
    Invoice.find({ _id: mongoose.Types.ObjectId(req.params.invoiceId) }, function (err, invoice) {
        if (err) {
            return res.json({ err: err });
        }
        return res.status(200).json(invoice[0]);
    });
};

//update invoice
exports.updateInvoice = function (req, res) {
    console.log(mongoose.Types.ObjectId(req.params.gstinId));

    Invoice.find({
        _id: mongoose.Types.ObjectId(req.body.id)
    }, function (err, invoice) {
        if (err) {
            return res.json({ err: err });
        }

        var updateInvoice = invoice[0];

        updateInvoice.invoiceDate = req.body.invoiceDate,
            updateInvoice.invoiceType = req.body.invoiceType,
            updateInvoice.reference = req.body.reference,
            updateInvoice.dueDate = req.body.dueDate,
            updateInvoice.contactId = mongoose.Types.ObjectId(req.body.contactId),
            updateInvoice.contactName = req.body.contactName,
            updateInvoice.contactGstin = req.body.contactGstin,
            updateInvoice.billingAddress = {
                state: req.body.billingAddress.state,
                address: req.body.billingAddress.address,
                pinCode: req.body.billingAddress.pinCode,
                city: req.body.billingAddress.city
            },
            updateInvoice.shippingAddress = {
                state: req.body.shippingAddress.state,
                address: req.body.shippingAddress.address,
                pinCode: req.body.shippingAddress.pinCode,
                city: req.body.shippingAddress.city
            },
            updateInvoice.placeOfSupply = req.body.placeOfSupply,

            updateInvoice.invoiceDetails = [];

        var itemArray = [];
        var itemObject = {
            _id: "",
            itemOrdinal: "",
            itemDescription: "",
            itemType: "",
            hsnCode: "",
            qty: 0,
            ratePerItem: 0,
            discount: 0,
            taxableValue: 0,
            cgstPer: 0,
            cgstAmount: 0,
            sgstPer: 0,
            sgstAmount: 0,
            igstPer: 0,
            igstAmount: 0,
            cessPer: 0,
            cessAmount: 0,
            total: 0
        };

        _.each(req.body.invoiceDetails, function (i) {
            itemObject = {};
            itemObject._id = mongoose.Types.ObjectId(),
                itemObject.itemOrdinal = i.itemOrdinal,
                itemObject.itemDescription = i.itemDescription,
                itemObject.itemType = i.itemType,
                itemObject.hsnCode = i.hsnCode,
                itemObject.qty = i.qty,
                itemObject.ratePerItem = i.ratePerItem,
                itemObject.discount = i.discount,
                itemObject.taxableValue = i.taxableValue,
                itemObject.cgstPer = i.cgstPer,
                itemObject.cgstAmount = i.cgstAmount,
                itemObject.sgstPer = i.sgstPer,
                itemObject.sgstAmount = i.sgstAmount,
                itemObject.igstPer = i.igstPer,
                itemObject.igstAmount = i.igstAmount,
                itemObject.cessPer = i.cessPer,
                itemObject.cessAmount = i.cessAmount,
                itemObject.total = i.total
            itemArray.push(itemObject);
        });

        updateInvoice.invoiceDetails = itemArray;

        //update the invoice
        updateInvoice.save(function (err) {
            if (err)
                res.send(err);

            Invoice.findOne(mongoose.Types.ObjectId(req.body.id), function (err, result) {
                if (err) throw err;
    
                //console.log(result);
                return res.status(200).json(result);
            });
        });        
    });
};

//remove invoice
exports.removeInvoice = function (req, res) {
    Invoice.remove({
        _id: mongoose.Types.ObjectId(req.params.invoiceId)
    }, function (err) {
        if (err)
            return res.send(err);

        return res.status(200).json({ message: 'Successfully deleted' });
    });
};
