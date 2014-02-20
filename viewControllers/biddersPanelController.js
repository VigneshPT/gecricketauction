module.exports.controller = function(app){
	 require('../helpers/gecaHelper').gecaHelper.prePopulateCaptains();
	 var Captain = require('../models/captain.js').Captain;
	 app.get('/team/:passcode',function(req,res){
	 	var passcode = req.params.passcode;
	 	var teamName = "";
	 	switch(passcode){
	 		case "1010":
	 			//this is for Ninjas
	 			teamName = "Ninjas";break;
	 		case "2121":
	 			teamName = "Red Hawks";break;
	 		case "3434":
	 			teamName = "Gillies";break;
	 		case "5656":
	 			teamName = "Kiwis";break;
	 	}
	 	Captain.findOne({teamName:teamName},function(err,captainObj){
	 		if(err)
	 			throw err;
	 		else{
	 			console.log(JSON.stringify(captainObj));
	 			if(captainObj ==null || typeof captainObj == "undefined"){
	 				res.send("Sorry, you are not authorized.");
	 			}
	 			else	
	 				res.render("biddersPanel/index",{team:captainObj,guiType:"bidder"});
	 		}
	 	});
	 	
	 });
}


module.exports.socket = function(socket,allSockets){
	
	//console.log(allSockets);
	// socket.on('message',function(data){
	// 	socket.broadcast.emit('message',data);	
	// });

	socket.on('getOnlineUsers',function(data){
		socket.emit('updateOnlineUsers',Object.keys(users));
	});
	//allSockets.emit('connected',Object.keys(users));
	socket.on('message',function(msg){

		console.log(msg);
		socket.broadcast.emit("bid",msg)

     //  allSockets.socket(users[msg.target]).emit('message',{
     //  		"source": srcUser,
     //  		"type":msg.type,
     //       	"message": msg.message,
     //       	"target": msg.target});
    	// }
	});

	socket.on('disconnect', function() {

  	});
	
};