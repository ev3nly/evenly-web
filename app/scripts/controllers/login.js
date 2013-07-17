'use strict';
/* global _: false */

angular.module('evenlyApp')
  .controller('LoginCtrl', ['$scope', 'Session', '$rootScope', '$location', function ($scope, Session, $rootScope, $location) {

    $scope.login = function(email, password) {
      Session
        .create(email, password)
        .then(function(result) {
          console.log(result);
          $location.path('/home');
        });
    };

    $rootScope.showNav = false;
  }]);
