'use strict';

describe('Directive: eveSendForm', function () {
  beforeEach(module('evenlyApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<eve-send-form></eve-send-form>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the eveSendForm directive');
  }));
});
