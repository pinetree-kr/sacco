'use strict';

angular.module('saccoApp')
  .controller('DialogController', function ($scope, $mdDialog, $http) {
  $scope.closeDialog = function() {
    $mdDialog.hide();
  };

  
  $scope.addThing = function() {
    if($scope.newThing === '') {
      return;
    }
    $http.post('/api/things', { name: $scope.newThing });
    $scope.newThing = '';
    $mdDialog.hide();
  };
})
  .controller('LoginController', function($scope, $mdDialog, $location, user, Authentication){
    $scope.closeDialog = function() {
      $mdDialog.hide();
    };
    $scope.login = function(form){
      if(form.$valid){
        $scope.user = {
          phone : $scope.phone,
          password : $scope.password
        }
        user.login($scope.user
          ,function(res){
            Authentication.set(res);
            $location.path('/');
            $scope.closeDialog();
          },handleError);
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
  .controller('JoinController', function($scope, $mdDialog, $location, user, Authentication){
    $scope.closeDialog = function() {
      $mdDialog.hide();
    };
    $scope.join = function(form){
      if(form.$valid){
        $scope.user = {
          name : $scope.name,
          phone : $scope.phone,
          password : $scope.password
        }
        user.join($scope.user
          ,function(res){
            Authentication.set(res);
            $location.path('/');
            $scope.closeDialog();
          },handleError);
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
