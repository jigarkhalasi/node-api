var Item = require('../models/item/item.model');// get our mongoose model
var mongoose = require('mongoose');

//create the item
exports.addItem = function (req, res) {
    console.log('Item');

    // create a item
    var saveItem = new Item({
        _id: mongoose.Types.ObjectId(),
        businessId: mongoose.Types.ObjectId(req.params.businessId),
        itemDescription: req.body.itemDescription,
        itemType: req.body.itemType,
        hsnCode: req.body.hsnCode,
        itemCode: req.body.itemCode,
        sellingPrice: req.body.sellingPrice,
        purchasePrice: req.body.purchasePrice,
        unitOfMeasurement: req.body.unitOfMeasurement,
        discount: req.body.discount,
        itemNotes: req.body.itemNotes,
        isActive: true,
        isDeleted: false
    });

    saveItem.save(function (err) {

        if (err) {
            console.log(err);
            return res.json({ success: false });
        }
        console.log('completed Item!!');
        return res.status(200).send(saveItem);
    });

};

// Display list of all Item
exports.itemList = function (req, res) {
    console.log('call api');
    Item.find({ businessId: mongoose.Types.ObjectId(req.params.businessId) }, function (err, items) {
        if (err) {
            return res.json({ err: err });
        }
        return res.status(200).json(items);
    });
};

//get item by id
exports.itemById = function (req, res) {
    console.log(mongoose.Types.ObjectId(req.params.itemId));
    Item.find({ _id: mongoose.Types.ObjectId(req.params.itemId) }, function (err, item) {
        if (err) {
            return res.json({ err: err });
        }
        return res.status(200).json(item[0]);
    });
};

//update Contact
exports.updateItem = function (req, res) {
    console.log(mongoose.Types.ObjectId(req.body.id));
    Item.find({ _id: mongoose.Types.ObjectId(req.body.id) }, function (err, items) {
        if (err) {
            return res.json({ err: err });
        }

        var item = items[0];
        console.log(item);
        item.itemDescription= req.body.itemDescription;
        item.itemType= req.body.itemType;
        item.hsnCode= req.body.hsnCode;
        item.itemCode= req.body.itemCode;
        item.sellingPrice= req.body.sellingPrice;
        item.purchasePrice= req.body.purchasePrice;
        item.unitOfMeasurement= req.body.unitOfMeasurement;
        item.discount= req.body.discount;
        item.itemNotes= req.body.itemNotes; 

        //update the Contact
        item.save(function (err) {
            if (err)
                res.send(err);

            return res.status(200).json({ item: item });
        });
    });
};

//remove item
exports.removeItem = function (req, res) {
    Item.remove({
        _id: mongoose.Types.ObjectId(req.params.itemId)
    }, function (err) {
        if (err)
            return res.send(err);

        return res.status(200).json({ message: 'Successfully deleted' });
    });
};
