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
				method: 'GET',
				url : '/api/users/find/'
			},
			create: {
				method: 'POST'
			}
		});
  });
