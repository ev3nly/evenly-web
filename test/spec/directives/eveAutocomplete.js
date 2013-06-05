'use strict';

describe('Directive: eveAutocomplete', function () {
  beforeEach(module('evenlyApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<eve-autocomplete></eve-autocomplete>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the eveAutocomplete directive');
  }));
});
