var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var RegisterUserSchema = new Schema({
    _id: ObjectId,
    firstname: String,
    lastname: String,
    email: String,
    passwordHash: String,
    salt: String,
    isActive: Boolean,
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
    role: String
})
// set up a mongoose model
module.exports = mongoose.model('users', RegisterUserSchema);