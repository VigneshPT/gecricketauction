var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var playerSchema = new Schema({
		name: 			String,
		teamName: 		String,
		skillType: 		String,
		bidStatus: 		Boolean,
		basePrice: 		Number,  
		biddedFor: 		Number
});
//if model is already defined, then creating it again will throw exception. 
//so, use model if already created, otherwise, create model.
var Player = undefined;
try{
	Player = mongoose.model('Player');
}
catch(e){
	Player = mongoose.model('Player',playerSchema);
}
module.exports.Player = Player;