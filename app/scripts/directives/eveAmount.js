'use strict';

angular.module('evenlyApp')
  .directive('eveAmount', function () {
    return {
      templateUrl: 'views/amount.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        scope.isCurrency = function(value) {
          console.log("validating currency");
          return /^\$?[0-9][0-9\,]*(\.\d{1,2})?$|^\$?[\.]([\d][\d]?)$/.test(value);
        };

        scope.isGte = function(value, min) {
          console.log("validating gte");

          min = min || 0.50;
          if (value === undefined) { return false; };
          return value.replace(/[^0-9\.]/g,'') >= min;
        }
      }
    };
  });
