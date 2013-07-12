'use strict';

angular.module('evenlyApp')
  .controller('SignupCtrl', ['$scope', '$location', 'User', function ($scope, $location, User) {
    $scope.signup = function() {
      User.create({
        name: $scope.name,
        email: $scope.email,
        phone_number: $scope.phoneNumber,
        password: $scope.password,
        password_confirmation: $scope.password
      }).then(function(user) {
        console.log("created user " + user.name);
      }, function(response) {
        console.log(response);
        if (response.data.error) {
          $scope.serverErrors = [response.data.error];
        } else {
          $scope.serverErrors = response.data.errors;
        }
      });
    };

    $scope.serverErrors = [];
  }]);
