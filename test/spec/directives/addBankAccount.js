'use strict';

describe('Directive: addBankAccount', function () {
  beforeEach(module('evenlyApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<add-bank-account></add-bank-account>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the addBankAccount directive');
  }));
});
