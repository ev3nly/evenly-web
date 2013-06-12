'use strict';

angular.module('evenlyApp')
  .directive('eveSendForm', function () {
    return {
      templateUrl: 'views/send-form.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        /* Invalids */

        scope.invalidRecipient = function() {
          if (scope.form.recipient === undefined) { return; }
          return !!scope.form.recipient.$error.required;
        }

        scope.invalidAmount = function() {
          if (scope.form.amount === undefined) { return; }

          var gteError      = !!scope.form.amount.$error.gte;
          var currentError  = !!scope.form.amount.$error.currency;
          return gteError || currentError;
        }

        scope.invalidDescription = function() {
          if (scope.form.description === undefined) { return; }
          return !!scope.form.description.$error.required
        }

        scope.invalidForm = function() {
          var invalidAmount = scope.invalidAmount();
          var invalidDescription = scope.invalidDescription();

          return invalidAmount || invalidDescription;
        }

        /* Show Errors */

        scope.showAmountCurrencyError = function() {
          if (scope.form.amount === undefined) { return; }
          return !!scope.form.amount.$error.currency && scope.submitAttempted
        }

        scope.showAmountGteError = function() {
          if (scope.form.amount === undefined) { return; }
          return !!scope.form.amount.$error.gte && scope.submitAttempted
        }

        scope.showDescriptionRequiredError = function() {
          if (scope.form.description === undefined) { return; }
          return !!scope.form.description.$error.required && scope.submitAttempted
        }

        scope.showErrors = function() {
          var errors = scope.showAmountCurrencyError() 
            || scope.showAmountGteError() 
            || scope.showDescriptionRequiredError();

          return scope.submitAttempted && errors;
        }

        /* Classes */

        scope.classForRecipient = function() {
          if (scope.form.recipient === undefined) { return; }
          if (scope.form.recipient.$viewValue === undefined) { return; };
          return scope.invalidRecipient() ? "error" : "success";
        };

        scope.classForAmount = function() {
          if (scope.form.amount === undefined) { return; }
          if (scope.form.amount.$viewValue === undefined) { return; };
          return scope.invalidAmount() ? "error" : "success";
        };

        scope.classForDescription = function() {
          if (scope.form.description === undefined) { return; }
          if (scope.form.description.$viewValue === undefined) { return; };
          return scope.invalidDescription() ? "error" : "success";
        };

        scope.classForButton = function() {
          return scope.invalidForm() ? "btn-primary disabled" : "btn-primary";
        }
      }
    };
  });
