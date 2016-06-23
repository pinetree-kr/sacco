'use strict';

describe('Controller: SaccoCtrl', function () {

  // load the controller's module
  beforeEach(module('saccoApp'));

  var SaccoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SaccoCtrl = $controller('SaccoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
