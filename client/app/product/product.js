'use strict';

angular.module('saccoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('product', {
        url: '/product',
        templateUrl: 'app/product/product.html',
        controller: 'ProductCtrl'
      });
  });