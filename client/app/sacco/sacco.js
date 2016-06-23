'use strict';

angular.module('saccoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('sacco', {
        url: '/sacco',
        templateUrl: 'app/sacco/sacco.html',
        controller: 'SaccoCtrl'
      });
  });