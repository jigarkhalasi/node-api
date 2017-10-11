var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var BusinessSchema = new Schema({
    _id: ObjectId,
    businessName: String,
    pan: String,
    logo: String,
    isActive: Boolean,
    isDeleted: Boolean,
    userId: ObjectId,
    gstins: [{
        _id: ObjectId,
        gstin: String,
        displayName: String
    }]
})
// set up a mongoose model
module.exports = mongoose.model('business', BusinessSchema);