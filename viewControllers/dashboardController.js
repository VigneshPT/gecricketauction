//dashboard is the view, that both the admin and viewers will see.
module.exports.controller = function(app){
	var Captain = require('../models/captain').Captain;
	var Player = require("../models/player").Player;
	app.get('/auction/:mode?/:keyphrase?',function(req,res){
		var isAdminMode = req.params.mode=="admin";
		var isAuthentic = req.params.keyphrase == "gecpl";
		//get the list of teams, for the auction as well as admin page.
		Captain.find({},function(err,teams){
			if(err)
				res.send(500,"Could not get list of teams");
			else{
				Player.find({},function(error,players){
					if(error)
						res.send(500,"could not get list of players");
					else{
						if(isAdminMode && isAuthentic){
							res.render("dashboard/index",{guiType:"admin",teams:teams,players:players})
						}
						else{
							res.render("dashboard/index",{guiType:"viewer",teams:teams,players:players});
						}
					}
				});
					
			}
			
		});
		
	});
}

module.exports.socket = function(socket,allSockets){
	
	var Captain = require("../models/captain").Captain;
	var Player = require("../models/player").Player;
	
	socket.on('switchPlayer',function(playerData){
		allSockets.emit('switchPlayer',playerData);
	});

	socket.on("changePlayer", function(data){
		socket.broadcast.emit("updateChangedPlayer", data);
	});
	socket.on('bidRaised',function(data){
		//find the particular captain, and check if he has enough points to bid for the person.
		Captain.findOne({teamName:data.from},function(err,team){
			if(err){
				console.log(err.message);
			}
			else{
				if(team.pointsRemaining > data.raisedBy){
					//just raise the event to everyone with same data.
					allSockets.emit('bidRaised',data);
					

					//this means the team has enough points to raise a bid
					// team.pointsRemaining = team.pointsRemaining - data.raisedBy;
					// team.save(function(error){
					// 	if(error)
					// 		console.log("error saving updated points after raising bid.");
					// 	else
					// 		allSockets.emit('bidRaised',data);
					// });
				}
				else{
					//TODO: logic when not enough points
				}
			}
		});
		
	});

	socket.on('bidClosed',function(data){
		//data should look like
		/*{
			playerName:"Siva",
			teamName:"Ninjas",
			bidAmount: 400
		}*/

		//find the captain, and 1.deduct points after bidding, 2.update the particular player, and save. 
		Captain.findOne({teamName:data.teamName},function(err,team){
			team.pointsRemaining = team.pointsRemaining - data.bidAmount;
			team.save(function(){});
			Player.findOne({name:playerName},function(error,player){
				player.teamName = data.teamName;
				player.bidStatus = true;
				player.biddedFor = data.bidAmount;
				player.save(function(pSaveError){
					if(pSaveError)
						console.log(pSaveError.message);
					else
						allSockets.emit('bidClosed',data);
				});

			});
		});
	});

	socket.on('getOnlineUsers',function(data){
		//No need to use this now.
	});
	socket.on('message',function(msg){

		//No need to use this now. 
	});

	socket.on('disconnect', function() {

  	});
	
};