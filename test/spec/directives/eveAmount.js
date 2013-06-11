'use strict';

describe('Directive: eveAmount', function () {
  beforeEach(module('evenlyApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<eve-amount></eve-amount>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the eveAmount directive');
  }));
});
