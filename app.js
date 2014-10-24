var myApp = angular.module('myApp', ['ngAnimate']);
myApp.controller('MyController', function($scope, $http) {
	$scope.imageLinks = [];
	$scope.profileLinks = [];
	// $scope.valid = $scope.form	.$valid;
		// console.log('before', $scope.form.$valid);
	$scope.submit = function() {
		$scope.valid = $scope.form.$valid;
		var tag = $scope.searchTerm;
		var tagString = tag.toString();
		var config = {
			url: 'https://api.instagram.com/v1/tags/'+  tagString +'/media/recent',
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



		$http(config).success(function(response) {
				var resultDisplay = document.getElementsByClassName('resultDisplay')[0];
				resultDisplay.innerHTML = '';

				$scope.resolved = true;

				for (var i = 0; i < response.data.length; i++) {
					$scope.imageLinks[i] = response.data[i].images.low_resolution.url;
					$scope.profileLinks[i] = response.data[i].link; 
				}

				console.log('imagelinks', $scope.imageLinks);
				console.log('profilelinks', $scope.profileLinks);

				for (var i = 0; i < response.data.length; i++) {
					var a = document.createElement("a");
					// a.setAttribute('href', $scope.profileLinks[i]);
					a.href = $scope.profileLinks[i];
					var img = document.createElement("img");
					// img.setAttribute('src', $scope.imageLinks[i]);
					img.src = $scope.imageLinks[i];
					a.appendChild(img);
					// a.class = 'images';
					resultDisplay.appendChild(a);
				}


			}).error(function(message) {
				$scope.failed = true;
			});

	}
	
});