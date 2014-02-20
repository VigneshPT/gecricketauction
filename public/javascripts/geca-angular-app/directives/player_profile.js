app.directive('userProfile', [function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $rootScope, $element, $attrs, $transclude) {
			$scope.players = [{
				name: "Shaul Hameed", 
				skill: "Batsman",
				baseprice: "10"
			},
			{

				name: "Vignesh", 
				skill: "Bowler",
				baseprice: "10"
			}]
			$scope.currentPlayer = {};


			$scope.$watch("player2", function(nVal, oldVal){
				if (nVal) {
					$scope.currentPlayer = JSON.parse(nVal)
					if (/admin\/gecpl/.test(window.location.pathname)) {
						$rootScope.socket.emit("changePlayer", JSON.parse(nVal))
					};		
				};
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
			$scope.team = [];
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