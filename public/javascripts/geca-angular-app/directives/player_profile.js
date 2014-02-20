app.directive('userProfile', [function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $rootScope, $element, $attrs, $transclude) {
			$scope.isAdmin = /admin\/gecpl/.test(window.location.pathname);
			$scope.players =players;

			$scope.picture = "http://www.stepuptravel.org/images/dummy_user.gif";
			for (var i = 0; i < players.length; i++) {
				$scope.players[i].photo = (typeof $scope.players[i].photo !== "undefined" && $scope.players[i].photo !== ""  )? "http://graph.facebook.com/"+$scope.players[i].photo+"picture?width=200" : "http://www.stepuptravel.org/images/dummy_user.gif";
				//$scope.players[i]
			};
			
			$scope.currentPlayer = {};
			setTimeout(function(){
				angular.element(".select2-hidden-accessible").hide();
			},1000)
			$scope.showfields = false;
			$scope.$watch("player2", function(nVal, oldVal){
				if (nVal) {
					$scope.currentPlayer = JSON.parse(nVal)
					if (/admin\/gecpl/.test(window.location.pathname)) {
						$rootScope.socket.emit("changePlayer", JSON.parse(nVal))
					};	
					$scope.showfields = true;
					$scope.picture = nVal.photo;
				}
			})

			$rootScope.socket.on("updateChangedPlayer", function(data){
				$scope.currentPlayer = data;
				angular.element("#select2-chosen-4").text(data.name);
				$scope.$apply();
			})
		},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: '/javascripts/geca-angular-app/components/player_info.html',
		replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
}]);

app.directive('bid', [function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: '/javascripts/geca-angular-app/components/bid_table.html',
		replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
		},
		controller: ["$scope","$rootScope", function($scope, $rootScope){
			$scope.team = eval("teamlist");
			//Socket starts here.
				
			 $rootScope.socket.on("teamready", function(team){
				$scope.team = team;
				$scope.$apply();
				});
			 $rootScope.socket.on("bid", function(teamname){
			 });
		}]
	};
}]);