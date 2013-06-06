'use strict';

angular.module('evenlyApp')
  .controller('SendCtrl', ['$scope', 'User', function ($scope, User) {
    User.all('e')
      .then(function(users) {
        users = _.map(users, function(u){ return {name: u.name }; });
        $scope.users = users;
      });

    $scope.sendMoney = function() {
      console.log("You owe " 
        + $scope.autocomplete.recipient + " $" 
        + $scope.payment.amount + " for "
        + $scope.payment.description);

      // Payment.create({amount:'1', description:'Making a website', to:{email:'justin@paywithivy.com'}});
    };

    $scope.isCurrency = function(value) {
      return /^\$?[0-9][0-9\,]*(\.\d{1,2})?$|^\$?[\.]([\d][\d]?)$/.test(value);
    };

    $scope.isGte = function(value, min) {
      min = min || 0.50;
      if (value === undefined) { return false; };
      return value.replace(/[^0-9\.]/g,'') >= min;
    }

    $scope.invalidRecipient = function() {
      return !!$scope.form.recipient.$error.required;
    }

    $scope.invalidAmount = function() {
      var gteError      = !!$scope.form.amount.$error.gte;
      var currentError  = !!$scope.form.amount.$error.currency;
      return gteError || currentError;
    }

    $scope.invalidDescription = function() {
      return !!$scope.form.description.$error.required
    }

    $scope.invalidForm = function() {
      var invalidAmount = $scope.invalidAmount();
      var invalidDescription = $scope.invalidDescription();

      return invalidAmount || invalidDescription;
    }

    $scope.classForRecipient = function() {
      if ($scope.form.recipient.$viewValue === undefined) { return; };
      return $scope.invalidRecipient() ? "error" : "success";
    };

    $scope.classForAmount = function() {
      if ($scope.form.amount.$viewValue === undefined) { return; };
      return $scope.invalidAmount() ? "error" : "success";
    };

    $scope.classForDescription = function() {
      if ($scope.form.description.$viewValue === undefined) { return; };
      return $scope.invalidDescription() ? "error" : "success";
    };

  }]);
