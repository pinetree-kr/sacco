'use strict';

angular.module('saccoApp')
  .controller('ShellCtrl', function ($mdSidenav, $mdDialog, $scope, $location, Authentication) {

    $scope.authentication = Authentication.get();
    if(!$scope.authentication && $location.path()!=='/join'){
      $location.path('/login');
    }

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.isLogin = function(){
      return $scope.authentication !== undefined && $scope.authentication !== null;
    }
    $scope.logout = function(){
      Authentication.logout();
      $location.path('/login');
    }

    $scope.toggleLeft = function() {
      $mdSidenav('left').toggle();
    };

    var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    $scope.moveUser = function(){
      $location.path('/user');
    }
    $scope.moveSacco = function(){
      $location.path('/sacco');
    }

    $scope.notificationsEnabled = true;
    $scope.toggleNotifications = function() {
      $scope.notificationsEnabled = !$scope.notificationsEnabled;
    };
/*/
    $scope.redial = function() {
      $mdDialog.show(
        $mdDialog.alert()
          .targetEvent(originatorEv)
          .clickOutsideToClose(true)
          .parent('body')
          .title('Suddenly, a redial')
          .content('You just called a friend; who told you the most amazing story. Have a cookie!')
          .ok('That was easy')
        );
      originatorEv = null;
    };

    $scope.checkVoicemail = function() {
      // This never happens.
    };
/**/
    $scope.showLoginDialog = function($event) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        targetEvent: $event,
        //templateUrl: 'components/shell/dialog/dialog.html',
        templateUrl: 'components/shell/dialog/login.html',
        controller: 'LoginController'
      });
    };

    $scope.showJoinDialog = function($event) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        targetEvent: $event,
        //templateUrl: 'components/shell/dialog/dialog.html',
        templateUrl: 'components/shell/dialog/join.html',
        controller: 'JoinController'
      });
    };
    /*/
    $scope.showAddDialog = function($event) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        targetEvent: $event,
        //templateUrl: 'components/shell/dialog/dialog.html',
        templateUrl: 'components/shell/dialog/login.html',
        controller: 'LoginCtrl'
      });
    };
    /**/
  });
