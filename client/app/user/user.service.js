'use strict';

angular.module('saccoApp')
  .service('user', function ($resource) {
    return $resource('/api/users/:user', {
			user: '@user'
		}, {
			getAll: {
				method: 'GET',
				isArray: true
			},
			get: {
				method: 'GET',
				isArray: false
			},
			find:{
				method: 'POST',
				url: '/api/users/find',
				isArray:false
			},
			login:{
				method: 'POST',
				url: '/api/users/login',
				isArray:false
			},
			join:{
				method: 'POST',
			}
		});
  })
  .factory('Authentication', function($cookieStore){
  	return {
		set:function(user){
			$cookieStore.put('user', user);		
		},
		get:function(){
			return $cookieStore.get('user');
		},
		logout:function(){
			$cookieStore.put('user', null);
		}
	};
  })
  ;
