module.exports.controller = function(app){
	var Player = require('../models/player').Player;
	app.get('/listPlayers',function(req,res){
		Player.find({},function(err,players){
			if(err)
				res.send(500,"could not query db");
			else
				res.render("listPlayers/index",{title:"Players",players:players});
		});
		
	});

}