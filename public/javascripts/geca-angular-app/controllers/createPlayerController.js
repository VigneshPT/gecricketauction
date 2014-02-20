app.controller('createPlayerController', ['$scope','$http', function($scope,$http){
	$scope.currentPlayer = {};
	$scope.categories = ["Batsman", "Bowler", "All-rounder"];
	
	$scope.submitPlayer= function(){
		$http.post('/createPlayer',$scope.currentPlayer).success(function(){
			alert('Player created');
		}).error(function(e){
			alert('Something Wrong happened!');
		});
	};

}]);