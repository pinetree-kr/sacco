'use strict';

angular.module('saccoApp')
  .controller('UserCtrl', function ($scope, user) {
  	$scope.user={
  	};

    $scope.submit = function(form){
    	if(form.$valid){
    		$scope.user.name = $scope.name;
    		$scope.user.phone = $scope.phone;
    		$scope.user.password = $scope.password;
			createUser($scope.user);
		}
	};

	var createUser = function(data){
		user.create(data,
			function(res){
				console.log(res);
				alert('success');
			},function(err){
				console.error(err);
				alert(err);
			});
	};

	var getUser = function(){
		user.getAll({

		},function(data){
			console.log(data);
		},function(err){
			console.error(err);
			alert(err);
		});
	};

  });
