'use strict';

describe('Directive: eveExchangeModal', function () {
  beforeEach(module('evenlyApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<eve-exchange-modal></eve-exchange-modal>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the eveExchangeModal directive');
  }));
});
