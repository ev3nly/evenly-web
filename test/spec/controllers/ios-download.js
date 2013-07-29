'use strict';

describe('Controller: IosDownloadCtrl', function () {

  // load the controller's module
  beforeEach(module('evenlyWebApp'));

  var IosDownloadCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IosDownloadCtrl = $controller('IosDownloadCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
