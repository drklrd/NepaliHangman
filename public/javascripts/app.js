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
		$scope.word = 'कमलकमलकमल';

		var mistakes = 0;
		var hanged = false;

		$scope.tryThisChar = function(char,index){
			if(!hanged && !$scope.keyStatus[index] && $scope.keyStatus.reduce(function(a,b){return a+b;},0)<$scope.word.length){
				$scope.keyStatus[index]=1;
				$scope.tryingChars = $scope.tryingChars +char;
				drawHangMan(mistakes);
				mistakes++;
			}
			
			
			
		}


		

		var cx = document.getElementById("hangmandrawing").getContext("2d");

		function drawPath(start,end){
			cx.beginPath();
			cx.moveTo(start[0], start[1]);
			cx.lineTo(end[0], end[1]);
			cx.closePath();
			cx.stroke();

		}

		(function inIt(){

			drawPath([50,190],[50,10]);
			drawPath([30,10],[190,10]);
			drawPath([120,10],[120,30]);
		})();


		var hangManBody = [
			function(){
				cx.beginPath();
				cx.arc(120,50,20,0,2*Math.PI);
				cx.stroke();
			},
			function(){
				drawPath([120,70],[100,100]);
			},
			function (){
				drawPath([120,70],[140,100]);
			},
			function (){
				drawPath([120,70],[120,130]);
			},
			function (){
				drawPath([120,130],[100,160]);
			},
			function (){
				drawPath([120,130],[140,160]);
			}


		];

		
		function drawHangMan(mistakes){
			

			hangManBody[mistakes]();

			if(mistakes>= hangManBody.length-1){
				hanged = true;
			}



		}





		


	}])