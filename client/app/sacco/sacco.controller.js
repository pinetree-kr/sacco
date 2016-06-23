'use strict';

angular.module('saccoApp')
	.controller('SaccoCtrl', function ($scope, sacco, $http) {
		$scope.sacco = {
			name:null,
			coord:{
				lat:null,
				long:null
			},
			admin:null,
			users:[]
		};
		$scope.user = {};
		$scope.coord = "0.4611851,33.17632";


		$scope.find = function(form){
			if(form.$valid){
				$scope.sacco.name = $scope.name;
				getSacco($scope.sacco);
			}
		}
		$scope.create = function(form){
			if(form.$valid){
				$scope.sacco.name = $scope.name;
				var coord = $scope.coord.split(',');
				$scope.sacco.coord['lat'] = coord[0];
				$scope.sacco.coord['long'] = coord[1];

				$scope.user.name = $scope.username;
				$scope.user.phone = $scope.userphone;

				getUser($scope.user);
			}
		}

		var createSacco = function(data){
			sacco.create(data,
				function(res){
					console.log(res);
					alert('success');
				}, handleError);
		};

		var getUser = function(data){
			$http.post('/api/users/check', data)
			.success(function(user) {
				user.admin = true;
				$http.put('/api/users/'+user._id, user)
				.success(function(res){
					//console.log(res);
					$scope.sacco.admin = user._id;
					$scope.sacco.users.push(user._id);
					createSacco($scope.sacco);
				})
				.error(handleError);

				//$scope.sacco.admin = user._id;
			})
			.error(handleError);
		}

		var handleError = function(err){
			console.error(err);
			if(err.data){
				alert(err.data);
			}
			else alert(err);
			
		}


	});
