var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ItemSchema = new Schema({
    _id: ObjectId,
    businessId: ObjectId,
    itemDescription: String,
    itemType: String,
    hsnCode: String,
    itemCode: Number,
    sellingPrice: Number,
    purchasePrice: Number,
    unitOfMeasurement: String,
    discount: Number,
    itemNotes: String,
    isActive: Boolean,
    isDeleted: Boolean    
})

// set up a mongoose model
module.exports = mongoose.model('items', ItemSchema);