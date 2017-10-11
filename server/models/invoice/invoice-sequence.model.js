var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var InvoiceSequenceSchema = new Schema({
    _id: ObjectId,
    gstinId: ObjectId,
    code: String,
    prefix: String,
    startNo: Number
})

// set up a mongoose model
module.exports = mongoose.model('invoicesequences', InvoiceSequenceSchema);