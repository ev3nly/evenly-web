'use strict';

angular.module('evenlyApp')
  .directive('eveExchangeModal', function () {
    return {
      templateUrl: 'views/exchange-modal.html',
      restrict: 'E',
      // replace: true,
      link: function postLink(scope, element, attrs) {
        scope.type = attrs.type;

        if (scope.type === "request") {
          scope.title = "Request";
          scope.submitMessage = "Complete Request";
          scope.help1 = "";
          scope.help2 = "owes me";

        } else if (scope.type === "payment") {
          scope.title = "New Payment";
          scope.submitMessage = "Complete Payment";
          scope.help1 = "Pay";
          scope.help2 = "";
        }

        scope.help3 = "for";
        // scope.title = "TITLE";
        // scope.help1 = "HELP-1";
        // scope.help2 = "HELP-2";
        // scope.help3 = "HELP-3";
        // scope.submitMessage = "SUBMIT";
      }
    };
  });
