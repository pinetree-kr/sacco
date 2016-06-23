'use strict';

angular.module('saccoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/user',
        templateUrl: 'app/user/user.html',
        controller: 'UserCtrl'
      })
      .state('login',{
      	url: '/login',
      	templateUrl: 'app/user/login.html',
      	controller: 'LoginCtrl'
      })
      .state('join',{
        url: '/join',
        templateUrl: 'app/user/join.html',
        controller: 'JoinCtrl'
      })
      ;
  });