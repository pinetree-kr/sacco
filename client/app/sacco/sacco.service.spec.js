'use strict';

describe('Service: sacco', function () {

  // load the service's module
  beforeEach(module('saccoApp'));

  // instantiate service
  var sacco;
  beforeEach(inject(function (_sacco_) {
    sacco = _sacco_;
  }));

  it('should do something', function () {
    expect(!!sacco).toBe(true);
  });

});
