var myApp = angular.module('myApp', ['ngAnimate']);
myApp.controller('MyController', function($scope, $http) {
	$scope.submit = function() {
		var tag = $scope.searchTerm;
		// var tagString = tag.toString();
		var config = {
			url: 'https://api.instagram.com/v1/tags/'+  tag +'/media/recent',
			method: 'JSONP',
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
		$scope.valid = $scope.form.$valid;

		$http(config).success(function(response) {
				$scope.resolved = true;
				$scope.numResults = response.data.length;

				$scope.response = response;
				// debugger;
				// $scope.imageLinks = [];
				// $scope.profileLinks = [];

				
				// for (var i = 0; i < response.data.length; i++) {
				// 	$scope.imageLinks[i] = response.data[i].images.low_resolution.url;
				// 	$scope.profileLinks[i] = response.data[i].link;
				// }

				// console.log('imageLinks', $scope.imageLinks);
				// console.log('profileLinks', $scope.profileLinks)
			}).error(function(message) {
				$scope.failed = true;
			});
	}
	
});