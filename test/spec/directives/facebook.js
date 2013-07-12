'use strict';

describe('Directive: facebook', function () {
  beforeEach(module('evenlyWebApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<facebook></facebook>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the facebook directive');
  }));
});
