'use strict';

angular.module('evenlyApp')
  .directive('eveDescription', [function () {
    return {
      templateUrl: 'views/description.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.validDescription = function() {
          return (scope.description !== null);
        };
      }
    };
  }]);
