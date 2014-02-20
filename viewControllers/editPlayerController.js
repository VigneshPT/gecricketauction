module.exports.controller = function(app){
	var Player = require('../models/player').Player;
	app.get('/editPlayer/:id',function(req,res){
		var id = req.params.id;
		console.log(id);
		Player.findById(id,function(err,player){
			if(err)
				res.send(500,"could not find player");
			else{
				res.render("editPlayer/index",{title:"Edit Player",player:player});
			}
		});
	});

	app.get('/removePlayer/:id',function(req,res){
		var Player = require('../models/player').Player;

		var id = req.params.id;
		Player.findByIdAndRemove(id,function(err){
			if(err)
				res.send(500,"could not remove player");
			else{
				res.redirect('/listplayers');
			}
		});
		

	});

	app.post('/editPlayer',function(req,res){
		//res.render('home/index',{title: "GlobalEnglish Cricket Auction"});
		var player = req.body;
		Player.findOne({id:player.id},function(err,foundPlayer){
			if(err)
				res.send(500,"could not find that user");
			else{
				foundPlayer.name = player.name;
				foundPlayer.basePrice = player.basePrice;
				foundPlayer.skillType = player.skillType;
				foundPlayer.profileImageUrl = player.profileImageUrl;
				foundPlayer.save(function(error,saved){
					if(error)
						res.send(500,"could not save user");
					else{
						res.render("editPlayer/index",{title:"Edit Player",player:foundPlayer});
					}
				});
			}
		});
	});

}