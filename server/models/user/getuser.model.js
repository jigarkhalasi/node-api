var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String, 
	password: String
})
// set up a mongoose model
module.exports = mongoose.model('users', UserSchema);