'use strict';

angular.module('evenlyApp')
  .controller('SendCtrl', ['$scope', 'User', function ($scope, User) {
    

    $scope.sendMoney = function() {
      $scope.submitAttempted = true;

      if ($scope.invalidForm()) {
        console.log("form is invalid!");
        return;
      }

      console.log("You owe " 
        + $scope.autocomplete.recipient + " $" 
        + $scope.payment.amount + " for "
        + $scope.payment.description);

      // Payment.create({amount:'1', description:'Making a website', to:{email:'justin@paywithivy.com'}});
    };

    /* Validations */

    $scope.isCurrency = function(value) {
      return /^\$?[0-9][0-9\,]*(\.\d{1,2})?$|^\$?[\.]([\d][\d]?)$/.test(value);
    };

    $scope.isGte = function(value, min) {
      min = min || 0.50;
      if (value === undefined) { return false; };
      return value.replace(/[^0-9\.]/g,'') >= min;
    }

    /* Invalids */

    $scope.invalidRecipient = function() {
      if ($scope.form.recipient === undefined) { return; }
      return !!$scope.form.recipient.$error.required;
    }

    $scope.invalidAmount = function() {
      if ($scope.form.amount === undefined) { return; }

      var gteError      = !!$scope.form.amount.$error.gte;
      var currentError  = !!$scope.form.amount.$error.currency;
      return gteError || currentError;
    }

    $scope.invalidDescription = function() {
      if ($scope.form.description === undefined) { return; }
      return !!$scope.form.description.$error.required
    }

    $scope.invalidForm = function() {
      var invalidAmount = $scope.invalidAmount();
      var invalidDescription = $scope.invalidDescription();

      return invalidAmount || invalidDescription;
    }

    /* Undefined */

    $scope.undefinedAmount = function() {
      return $scope.form.amount.$viewValue === undefined;
    };

    $scope.undefinedDescription = function () {
      return $scope.form.description.$viewValue === undefined;
    };

    /* Show Errors */

    $scope.showAmountCurrencyError = function() {
      if ($scope.form.amount === undefined) { return; }
      return !!$scope.form.amount.$error.currency && !$scope.undefinedAmount()
    }

    $scope.showAmountGteError = function() {
      if ($scope.form.amount === undefined) { return; }
      return !!$scope.form.amount.$error.gte && !$scope.undefinedAmount()
    }

    $scope.showDescriptionRequiredError = function() {
      if ($scope.form.description === undefined) { return; }
      return !!$scope.form.description.$error.required && !$scope.undefinedDescription()
    }

    $scope.showErrors = function() {
      var errors = $scope.showAmountCurrencyError() 
        || $scope.showAmountGteError() 
        || $scope.showDescriptionRequiredError();

      return $scope.submitAttempted && errors;
    }

    /* Classes */

    $scope.classForRecipient = function() {
      if ($scope.form.recipient === undefined) { return; }
      if ($scope.form.recipient.$viewValue === undefined) { return; };
      return $scope.invalidRecipient() ? "error" : "success";
    };

    $scope.classForAmount = function() {
      if ($scope.form.amount === undefined) { return; }
      if ($scope.form.amount.$viewValue === undefined) { return; };
      return $scope.invalidAmount() ? "error" : "success";
    };

    $scope.classForDescription = function() {
      if ($scope.form.description === undefined) { return; }
      if ($scope.form.description.$viewValue === undefined) { return; };
      return $scope.invalidDescription() ? "error" : "success";
    };

    $scope.classForSendButton = function() {
      return $scope.invalidForm() ? "disabled" : "";
    }

  }]);
