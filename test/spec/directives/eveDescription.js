'use strict';

describe('Directive: eveDescription', function () {
  beforeEach(module('evenlyWebApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<eve-description></eve-description>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the eveDescription directive');
  }));
});
