var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var questionSchema = new Schema({
		type: 			String, 
		body: 			String,
		answer: 		String,
		tags: 			[String],
		createdDate: 	Date,
		lastModified: 	Date,
		difficulty: 	Number   
});
//if model is already defined, then creating it again will throw exception. 
//so, use model if already created, otherwise, create model.
var Question = mongoose.model('Question') || mongoose.model('Question',questionSchema);

module.exports.Question = Question;