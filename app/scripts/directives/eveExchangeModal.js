'use strict';

angular.module('evenlyApp')
  .directive('eveExchangeModal', function () {
    return {
      templateUrl: 'views/exchange-modal.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        scope.title = "TITLE";
        scope.help1 = "HELP-1";
        scope.help2 = "HELP-2";
        scope.help3 = "HELP-3";
        scope.submitMessage = "SUBMIT";

        scope.openBool = attrs.openBool;
        console.log("seanyu");
        console.log(attrs.openBool)

        if (attrs.type === "request") {
          scope.type = "request";
        } else if (attrs.type === "payment") {
          scope.type ="payment";
        }
      }
    };
  });
