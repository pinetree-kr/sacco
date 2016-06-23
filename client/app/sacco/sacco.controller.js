'use strict';

angular.module('saccoApp')
	.controller('SaccoCtrl', function ($scope, sacco, $http, Authentication) {
		$scope.authentication = Authentication.get();
		
		sacco.get({sacco:$scope.authentication.sacco}, function(res){
			$scope.sacco = res;
			//console.log(res);
		}, handleError);

		$scope.user = {};
		$scope.join = function(form){
			if(form.$valid){
				$scope.user.name = $scope.name;
				$scope.user.phone = $scope.phone;

				getUser($scope.user, function(user){
					var arr = $scope.sacco.users.filter(function(item){
						return item._id === user._id;
					});
					if(arr.length===0){
						joinSacco($scope.sacco, user, function(res){
							$scope.sacco = res;
						});
					}else{
						console.log('already joined');
						alert('already joined');
					}
					//sacco.users.push(user._id);

				});
			}
		};

		var getUser = function(data, next){
			$http.post('/api/users/find', data)
			.success(next)
			.error(handleError);
		}

		var joinSacco = function(sacco, user, next){
			$http.post('/api/saccos/'+sacco._id+'/join', {
				user: user._id
			})
			.success(next)
			.error(handleError);
		}

		//sacco.get({})

		/*/
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
				getSacco($scope.sacco, function(sacco){
					console.log(sacco);
				});
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

				getUser($scope.user, function(user){
					user.admin = true;
					$http.put('/api/users/'+user._id, user)
					.success(function(res){
						//console.log(res);
						$scope.sacco.admin = user._id;

						//$scope.sacco.users.push(user._id);
						createSacco($scope.sacco, function(sacco){
							//console.log(res);
							//alert('success');
							joinSacco(sacco, user, function(res){
								console.log(res);
							});
						});
					})
					.error(handleError);
				});
			}
		}

		$scope.join = function(form){
			
			if(form.$valid){
				$scope.sacco.name = $scope.name;

				$scope.user.name = $scope.username;
				$scope.user.phone = $scope.userphone;

				getSacco($scope.sacco, function(sacco){
					//getUser
					getUser($scope.user, function(user){
						var arr = sacco.users.filter(function(item){
							return item._id === user._id;
						});
						if(arr.length===0){
							
							joinSacco(sacco, user, function(sacco){
								console.log(sacco);
							});
						}else{
							console.log('already joined');
						}
						//sacco.users.push(user._id);

					})
				});
			}
		}

		$scope.showProduct = function(form){
			if(form.$valid){
				$scope.sacco.name = $scope.name;

				getSacco($scope.sacco, function(sacco){
					getProduct(sacco, function(products){
						console.log(products);
						alert(products.length);
					});
				})
			}
		}

		var createSacco = function(data, next){
			sacco.create(data, next, handleError);
		};

		var getProduct = function(sacco, next){
			$http.get('/api/saccos/'+sacco._id+'/products')
			.success(next)
			.error(handleError);
		}

		var getSacco = function(data, next){
			$http.post('/api/saccos/find', {
				name:data.name
			})
			.success(function(sacco){
				next(sacco);
			})
			.error(handleError);
		}

		var joinSacco = function(sacco, user, next){
			$http.post('/api/saccos/'+sacco._id+'/join', {
				user: user._id
			})
			.success(next)
			.error(handleError);
		}

		var getUser = function(data, next){
			$http.post('/api/users/check', data)
			.success(next)
			.error(handleError);
		}
		/**/
		var handleError = function(err){
			console.error(err);
			if(err.data){
				alert(err.data);
			}
			else alert(err);
			
		}
	

	});
