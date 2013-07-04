'use strict';

describe('Directive: bsPopover', function () {
  beforeEach(module('evenlyWebApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<bs-popover></bs-popover>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the bsPopover directive');
  }));
});
