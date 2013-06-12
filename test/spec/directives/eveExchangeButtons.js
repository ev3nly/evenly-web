'use strict';

describe('Directive: eveExchangeButtons', function () {
  beforeEach(module('evenlyApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<eve-exchange-buttons></eve-exchange-buttons>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the eveExchangeButtons directive');
  }));
});
