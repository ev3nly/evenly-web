'use strict';

describe('Service: uri', function () {

  // load the service's module
  beforeEach(module('evenlyWebApp'));

  // instantiate service
  var uri;
  beforeEach(inject(function(_uri_) {
    uri = _uri_;
  }));

  it('should do something', function () {
    expect(!!uri).toBe(true);
  });

});
