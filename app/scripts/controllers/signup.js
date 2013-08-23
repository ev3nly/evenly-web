'use strict';

angular.module('evenlyApp')
  .controller('SignupCtrl', ['$scope', '$location', 'User', '$FB', '$timeout', '$rootScope', 'Session', 'Uri', function ($scope, $location, User, $FB, $timeout, $rootScope, Session, Uri) {
    var params = Uri.getVariables(window.location.href);
    $rootScope.campaign = params.campaign;
    if ($rootScope.campaign)
      $rootScope.campaignCode = "CAMP-" + $rootScope.campaign.toUpperCase();

    $scope.signup = function() {
      if (!$scope.submitting) {
        $scope.submitting = true;
        mixpanel.track('signup button clicked');

        User.create({
          name: $scope.name,
          email: $scope.email,
          phone_number: $scope.phoneNumber,
          password: $scope.password,
          password_confirmation: $scope.password,
          facebook_token: $rootScope.fbToken,
          facebook_id: $rootScope.fbId,
          sign_up_code: $rootScope.campaignCode
        }).then(function(user) {
          console.log("created user " + user.name);
          mixpanel.track('signup successful');

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
          mixpanel.track('signup failed');
          
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
      mixpanel.track('fb-continue button clicked');
      if ($FB.isAuthenticated()) {
        mixpanel.track('fb already authenticated');
      } else {
        $FB.login(function(response) {
          if (response.authResponse) {
            console.log("logged into Facebook!")
            $scope.loadFacebookMe();
            $scope.$apply();
            mixpanel.track('fb authentication successful');
          } else {
            console.log("failed to login to Facebook");
            mixpanel.track('fb authentication failed');
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
        $rootScope.fbId = response.id;
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
