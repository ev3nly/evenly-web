'use strict';

describe('Controller: BankAccountsCtrl', function () {

  // load the controller's module
  beforeEach(module('evenlyApp'));

  var BankAccountsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BankAccountsCtrl = $controller('BankAccountsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
