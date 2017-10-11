var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ContactSchema = new Schema({
    _id: ObjectId,
    businessId: ObjectId,
    name: String,
    pan: String,
    gstin: String,
    contactPerson: String,
    mobile: String,
    state: String,
    address: String,
    pinCode: String,
    city: String,
    email: String,
    landline: String,
    country: String,
    isActive: Boolean,
    isDeleted: Boolean
})

// set up a mongoose model
module.exports = mongoose.model('contacts', ContactSchema);