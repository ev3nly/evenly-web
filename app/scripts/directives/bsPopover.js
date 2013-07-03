'use strict';

angular.module('evenlyApp')
  .directive('bsPopover', ['$compile', '$http', '$timeout', function ($compile, $http, $timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs, ctrl) {
        $http.get(attrs.bsPopover).success(function(data) {
          element.popover({
            html: true,
            content: function() {
              $timeout(function() {
                $compile(element.data('popover').tip())(scope);
              });
              return data;
            }
          });
        })
      }
    };
  }]);
