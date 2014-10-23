var myApp = angular.module('myApp', ['ngAnimate']);
myApp.controller('MyController', function($scope, $http) {
	$scope.imageLinks = [];
	$scope.profileLinks = [];
	$scope.submit = function() {
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
				$scope.resolved = true;
				// console.log(response);

				// iterate over the objects that represent photos
				// fore each object, extract 2 data points:
				//       // image link 
				//       // link to profile
				// insert those data points into image els in the dom
				for (var i = 0; i < response.data.length; i++) {
					$scope.imageLinks.push(response.data[i].images.low_resolution.url);
					$scope.profileLinks.push(response.data[i].link);
					// $scope.results.push(response.data);					
				}

				console.log('imagelinks', $scope.imageLinks);
				console.log('profilelinks', $scope.profileLinks);

				// var p = document.createElement("p");
				// p.innerText("new para");
				// document.body.appendChild(p);
				// console.log(p);				

				for (var i = 0; i < response.data.length; i++) {
					// document.body.appendChild('<a href="'+ $scope.profileLinks[i] +'"><img src="' +  $scope.imageLinks[i] +'"></a>')
					var a = document.createElement("a");
					a.setAttribute('href', $scope.profileLinks[i]);
					var img = document.createElement("img");
					img.setAttribute('src', $scope.imageLinks[i]);
					// a.innerHTML = img;
					a.innerText = img;
					var resultDisplay = document.getElementsByClassName('resultDisplay')[0];
					resultDisplay.appendChild(a);
				}


			}).error(function(message) {
				$scope.failed = true;
			});

	}
	
});