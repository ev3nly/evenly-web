'use strict';

describe('Controller: DepositCtrl', function () {

  // load the controller's module
  beforeEach(module('evenlyApp'));

  var DepositCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DepositCtrl = $controller('DepositCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
