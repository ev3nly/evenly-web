'use strict';

describe('Service: vine', function () {

  // load the service's module
  beforeEach(module('evenlyApp'));

  // instantiate service
  var vine;
  beforeEach(inject(function(_vine_) {
    vine = _vine_;
  }));

  it('should do something', function () {
    expect(!!vine).toBe(true);
  });

});
