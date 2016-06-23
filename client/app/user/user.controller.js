'use strict';

angular.module('saccoApp')
  .controller('UserCtrl', function ($scope, user, Authentication) {
  	$scope.authentication = Authentication.get();
  	user.get({user:$scope.authentication._id}, function(res){
  		$scope.user = res;
  	}, handleError);
  	

  	/*/
  	$scope.user={
  	};

    $scope.create = function(form){
    	if(form.$valid){
    		$scope.user.name = $scope.name;
    		$scope.user.phone = $scope.phone;
    		$scope.user.password = $scope.password;
			createUser($scope.user);
		}
	};
	$scope.find = function(form){
		if(form.$valid){
			$scope.user.name = $scope.name;
			$scope.user.phone = $scope.phone;
			findUser($scope.user);
		}
	}

	var createUser = function(data){
		user.create(data,
			function(res){
				console.log(res);
				alert('success');
			},handleError);
	};

	var findUser = function(data){
		user.find({
			name:data.name,
			phone:data.phone
		},function(data){
			alert('find it');
			console.log(data);
		},handleError);
	};

	
	/**/
	var handleError = function(err){
		if(err.data){
			alert(err.data);
		}else{
			alert(err);
		}
		console.log(err);
	}
  })
  .controller('LoginCtrl', function($scope, $location, user, Authentication){
  	$scope.authentication = Authentication.get();
	//If user is signed in then redirect back home
	if ($scope.authentication) $location.path('/');

	$scope.user = {};
    $scope.submit = function(form){
      if(form.$valid){
      	$scope.user.phone = $scope.phone;
      	$scope.user.password = $scope.password;
      	user.login($scope.user, function(res){
      		console.log('login');
        	Authentication.set(res);
        	$location.path('/');
        }, handleError);
      }
    }

    $scope.moveJoin = function(){
    	$location.path('join');
    }

    var handleError = function(err){
		if(err.data){
			alert(err.data);
		}else{
			alert(err);
		}
		console.log(err);
	}
  })
  .controller('JoinCtrl', function($scope, $location, user, Authentication){
  	$scope.authentication = Authentication.get();
	if ($scope.authentication) $location.path('/');

	$scope.user = {};
    $scope.submit = function(form){
      if(form.$valid){
      	$scope.user.name = $scope.name;
      	$scope.user.phone = $scope.phone;
      	$scope.user.password = $scope.password;
      	user.join($scope.user, function(res){
      		console.log('join');
        	Authentication.set(res);
        	$location.path('/');
        }, handleError);
      }
    }
    
    var handleError = function(err){
		if(err.data){
			alert(err.data);
		}else{
			alert(err);
		}
		console.log(err);
	}
  })
  ;
