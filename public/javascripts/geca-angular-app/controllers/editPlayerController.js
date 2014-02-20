app.controller('editPlayerController', ['$scope','$http', function($scope,$http){
	$scope.currentPlayer = player;
	$scope.categories = ["Batsman", "Bowler", "All-rounder"];
	
	$scope.submitPlayer= function(){
		$http.post('/editPlayer',$scope.currentPlayer).success(function(){
			alert('Player created');
		}).error(function(e){
			alert('Something Wrong happened!');
		});
	};

	$scope.removePlayer= function(){
		$http.get('/removePlayer/'+$scope.currentPlayer._id).success(function(){
			window.location.href="/listplayers";
		}).error(function(e){
			alert('error removing');
		});
	}

}]);