'use strict';

angular.module('evenlyApp')
  .controller('SignupCtrl', ['$scope', '$location', 'User', '$FB', '$timeout', '$rootScope', 'Session', function ($scope, $location, User, $FB, $timeout, $rootScope, Session) {
    $scope.signup = function() {
      if (!$scope.submitting) {
        $scope.submitting = true;

        User.create({
          name: $scope.name,
          email: $scope.email,
          phone_number: $scope.phoneNumber,
          password: $scope.password,
          password_confirmation: $scope.password,
          facebook_token: $rootScope.fbToken,
          facebook_id: $rootScope
        }).then(function(user) {
          console.log("created user " + user.name);

          Session
            .create($scope.email, $scope.password)
            .then(function(result) {
              $location.path('/home');
              $scope.submitting = false;
            }, function(response) {
              $scope.serverError = response.data.message;
              $scope.submitting = false;
            });
        }, function(response) {
          console.log(response);
          $scope.submitting = false;
          if (response.data.error) {
            $scope.serverErrors = [response.data.error];
          } else {
            $scope.serverErrors = response.data.errors;
          }
        });
      }
    };

    $scope.serverErrors = [];

    $scope.$watch('submitting', function(value) {
      $scope.buttonTitle = value ? 'Signing Up...' : 'Sign Up';
    });

    $scope.facebookContinue = function() {
      if ($FB.isAuthenticated()) {

      } else {
        $FB.login(function(response) {
          if (response.authResponse) {
            console.log("logged into Facebook!")
            $scope.loadFacebookMe();
            $scope.$apply();
          } else {
            console.log("failed to login to Facebook");
          }
        }, {scope: 'email'});
      }
    };

    $scope.loadFacebookMe = function() {
      console.log("loading /me");
      $FB.api('/me', function(response) {
        $scope.name = response.name;
        $scope.email = response.email;
        $scope.$apply();
        console.log('loaded /me');
        console.log(response);
      });
    };

    $timeout($scope.loadFacebookMe, 1000);

    $scope.$watch(function() {
      return $FB.isAuthenticated();
    }, function(value) {
      console.log("FB.isAuthenticated() ? " + value);
    })
  }]);
