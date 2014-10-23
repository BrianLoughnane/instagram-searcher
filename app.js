var myApp = angular.module('myApp', ['ngAnimate']);
myApp.controller('MyController', function($scope, $http) {
	$scope.results = [];
	$scope.submit = function() {
		var tag = $scope.searchTerm;
		var tagString = tag.toString();
		var config = {
			url: 'https://api.instagram.com/v1/tags/'+  tagString +'/media/recent',
			method: 'GET',
			params: {
				callback: 'JSON_CALLBACK',
				client_id: '161eb0c438eb4699b7e00114e0dc0be0'				
			}
			
		};

		$scope.searchTerm = '';
		$scope.tag = tag;
		$scope.submitted = true;
		$scope.resolved = false;
		$scope.failed = false;

		$http(config).success(function(response) {
				$scope.resolved = true;
				console.log(response);
				// for (var i in response) {

				// 	// $scope.results.push(response.data);					
				// }
			}).error(function(message) {
				$scope.failed = true;
			});

	}
	
});