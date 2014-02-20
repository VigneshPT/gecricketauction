module.exports = function(io){
	//this file is serving sockets to the required controllers.
	//also listens for the "connection" event
	io.sockets.on('connection',function(socket){
		require(__dirname+'/viewControllers/dashboardController.js').socket(socket,io.sockets);
		require(__dirname+"/viewControllers/biddersPanelController.js").socket(socket,io.sockets);
		require(__dirname+"/viewControllers/homeController.js").socket(socket,io.sockets);
	});
};