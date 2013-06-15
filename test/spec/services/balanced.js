'use strict';

describe('Service: balanced', function () {

  // load the service's module
  beforeEach(module('evenlyApp'));

  // instantiate service
  var balanced;
  beforeEach(inject(function(_balanced_) {
    balanced = _balanced_;
  }));

  it('should do something', function () {
    expect(!!balanced).toBe(true);
  });

});
