var app = angular.module('gecaApp',['ui.directives']);
app.controller('sharedController', ['$scope',"$rootScope", function($scope, $rootScope){
	 $rootScope.socket = io.connect("http://"+window.location.hostname);
	$scope.showBid = false;

	$scope.$on("setTeamName", function(data){
		console.log(data);
	})

	if ($rootScope.currentTeam) {
		$scope.showBid = true;
	};

	console.log($rootScope.currentTeam);
	//tested the code
	// setTimeout(function(){
	// 	$scope.showBid = false;
	// 	$scope.$apply();
	// },3000)
}]);