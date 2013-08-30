'use strict';

angular.module('evenlyApp')
  .directive('eveExchangeModal', function () {
    return {
      templateUrl: 'views/exchange-modal.html',
      restrict: 'E',
      // replace: true,
      link: function postLink(scope, element, attrs) {
        scope.type = attrs.type;

        scope.hide = function() {
          scope.$eval(attrs.hide);
        };

        scope.submit = function() {
          scope.submitAttempted = true;

          if (scope.invalidForm()) {
            console.log('form is invalid!');
            return;
          }

          scope.submitting = true;
          scope.$eval(attrs.submit);
        };

        scope.reset = function() {
          scope.submitAttempted = false;
          scope.submitting = false;
          scope.serverError = undefined;
          scope.amount = null;
          scope.recipient = null;
          scope.recipientId = null;
          scope.description = null;
        };

        scope.$watch('submitting', function(){
          var object = scope.type.charAt(0).toUpperCase() + scope.type.slice(1);
          if (scope.submitting)
            scope.submitMessage = 'Sending ' + object + '...';
          else
            scope.submitMessage = 'Complete ' + object;
        });

        if (scope.type === 'request') {
          scope.title = 'Request';
          scope.help1 = '';
          scope.help2 = 'owes me';

        } else if (scope.type === 'payment') {
          scope.title = 'New Payment';
          scope.help1 = 'Pay';
          scope.help2 = '';
        }

        // scope.help3 = 'What\'d you share?';
        // scope.title = 'TITLE';
        // scope.help1 = 'HELP-1';
        // scope.help2 = 'HELP-2';
        // scope.help3 = 'HELP-3';
        // scope.submitMessage = 'SUBMIT';
      }
    };
  });
