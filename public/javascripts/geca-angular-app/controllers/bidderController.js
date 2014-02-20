app.controller('bidderController',["$scope","$rootScope",function($scope,$rootScope){
	console.log("teamname");
	$rootScope.currentTeam = teamname;
	$scope.bid= function(){
		 // $rootScope.socket
		console.log($rootScope.socket);
		 $rootScope.socket.emit("message",teamname);
	}
}]);