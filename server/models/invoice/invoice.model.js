var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var InvoiceSchema = new Schema({
    _id: ObjectId,
    gstinId: ObjectId,
    invoiceSequenceNo: String,
    invoiceDate: Date,
    invoiceType: String,
    reference: String,
    dueDate: Date,    
    contactId: ObjectId,
    contactName: String,
    contactGstin: String,
    billingAddress: {
        state: String,
        address: String,
        pinCode: String,
        city: String
    },
    shippingAddress: {
        state: String,
        address: String,
        pinCode: String,
        city: String
    },
    placeOfSupply: String,
    invoiceDetails: []
})

// set up a mongoose model
module.exports = mongoose.model('invoice', InvoiceSchema);