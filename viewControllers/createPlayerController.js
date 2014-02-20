module.exports.controller = function(app){
	var Player = require('../models/player').Player;
	app.get('/createPlayer',function(req,res){
		res.render("createPlayer/index",{title:"Create Player"});
	});
	app.post('/createPlayer',function(req,res){
		//res.render('home/index',{title: "GlobalEnglish Cricket Auction"});
		var player = req.body;
		if(player._id==null || player._id==""){
			//create a new document
			var newPlayer = new Player();
			newPlayer.name = player.name;
			newPlayer.basePrice = player.basePrice;
			newPlayer.skillType = player.skillType;
			newPlayer.profileImageUrl = player.profileImageUrl;
			console.log(newPlayer);
			newPlayer.save(function(err,saved){
				if(err){
					res.send(500,"could not save player "+newPlayer);
				}
				else{
					res.render('createPlayer/index',{title:"Create Player"});
				}
			}); 
		}
	});

}