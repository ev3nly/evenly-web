'use strict';

angular.module('evenlyApp')
  .controller('SignupCtrl', ['$scope', '$location', 'User', '$FB', '$timeout', function ($scope, $location, User, $FB, $timeout) {
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

    console.log("in SignupCtrl");
    $timeout(function() {
      console.log("loading /me");
      $FB.api('/me', function(response) {
        $scope.name = response.name;
        $scope.email = response.email;
        $scope.$apply();
        console.log('loaded /me');
        console.log(response);
      });

      $scope.facebook_friends = $FB.api('/me/friends', function(response) {
              $scope.facebook_friends = response.data;
              console.log("FRIENDS",response);
            });
    }, 1000);
  }]);
