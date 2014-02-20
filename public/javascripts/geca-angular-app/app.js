var app = angular.module('gecaApp',['ui.directives']);
app.controller('sharedController', ['$scope',"$rootScope", function($scope, $rootScope){
	 $rootScope.socket = io.connect("http://"+window.location.hostname);
	$scope.userProfile = {
		name: "Shaul Hameed",
		profile: "All - Rounder",
		baseprice: "850",
		currentteam: "",
		picture: "http://graph.facebook.com/shaul21h/picture?height=150&type=normal&width=150"
	}
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