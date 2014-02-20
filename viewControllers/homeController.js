module.exports.controller = function(app){

	app.get('/',function(req,res){
		res.render('home/index',{title: "GlobalEnglish Cricket Auction"});
	});

}

module.exports.socket = function(socket, allSocket){
	var Captain = require("../models/captain").Captain;
	var Player = require("../models/player").Player;
	Captain.find(function(err, team){
		socket.emit("teamready", team);
	})
}