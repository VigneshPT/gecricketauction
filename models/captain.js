var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var captainSchema = new Schema({
		name: 			String,
		teamName: 		String,  
		pointsRemaining:Number,
		userType: 		String,    
});
//if model is already defined, then creating it again will throw exception. 
//so, use model if already created, otherwise, create model.
var Captain = mongoose.model('Captain') || mongoose.model('Captain',captainSchema);

module.exports.Captain = Captain;