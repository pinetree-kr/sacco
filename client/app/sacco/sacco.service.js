'use strict';

angular.module('saccoApp')
	.service('sacco', function ($resource) {
		return $resource('/api/saccos/:sacco', {
			sacco: '@sacco'
		}, {
			getAll: {
				method: 'GET',
				isArray: true
			},
			get: {
				method: 'GET',
				isArray: false
			},
			create: {
				method: 'POST'
			}
		});
	});
