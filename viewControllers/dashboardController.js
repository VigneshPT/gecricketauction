//dashboard is the view, that both the admin and viewers will see.
module.exports.controller = function(app){
	
}

module.exports.socket = function(socket,allSockets){
	
	//console.log(allSockets);
	// socket.on('message',function(data){
	// 	socket.broadcast.emit('message',data);	
	// });

	socket.on('getOnlineUsers',function(data){
		//socket.emit('updateOnlineUsers',Object.keys(users));
	});
	//allSockets.emit('connected',Object.keys(users));
	socket.on('message',function(msg){

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