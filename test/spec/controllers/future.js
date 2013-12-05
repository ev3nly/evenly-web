'use strict';

describe('Controller: FutureCtrl', function () {

  // load the controller's module
  beforeEach(module('evenlyWebApp'));

  var FutureCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FutureCtrl = $controller('FutureCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
