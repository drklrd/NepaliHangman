var dependencies = [
	'ui.router'
];

angular.module('nepaliHangman',dependencies)
	
	.config(['$stateProvider','$urlRouterProvider','$httpProvider',function($stateProvider,$urlRouterProvider,$httpProvider){
		
		$urlRouterProvider.otherwise('/hangman');
		$stateProvider
			.state('hangman', {
				url: '/hangman',
				templateUrl: '/templates/index',
				controller : 'hangmanController'
			})
	}])

	.controller('hangmanController',['$scope',function($scope){


		var unicodeRows = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
		var unicodeColumns = ['090','091','092','093','094','095','096','097'];
		var codes = [];

		unicodeColumns.forEach(function(column){
			unicodeRows.forEach(function(row){
				codes.push(eval("'\\u"+(column+row)+"'"));
			})
		})

		$scope.keys = codes;

		$scope.tryingChars ='';
		$scope.keyStatus = [];
		$scope.tryThisChar = function(char,index){
			if(!$scope.keyStatus[index]){
				$scope.keyStatus[index]=true;
				$scope.tryingChars = $scope.tryingChars +char;
			}
			
		}


	}])