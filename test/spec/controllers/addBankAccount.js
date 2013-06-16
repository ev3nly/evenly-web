'use strict';

describe('Controller: AddBankAccountCtrl', function () {

  // load the controller's module
  beforeEach(module('evenlyApp'));

  var AddBankAccountCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddBankAccountCtrl = $controller('AddBankAccountCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
