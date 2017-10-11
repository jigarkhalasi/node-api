var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var GstratesSchema = new Schema({
    _id: ObjectId,    
    Type: String,
    HSNCode: String,
    NameOfCommodity: String,
    GSTRate: Number,
    CESS: Number,
    Note: String
})
// set up a mongoose model
module.exports = mongoose.model('gstrates', GstratesSchema);

