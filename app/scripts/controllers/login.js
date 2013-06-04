'use strict';

angular.module('evenlyApp')
  .controller('LoginCtrl', ['$scope', '$location', 'Session', function ($scope, $location, Session) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.email = 'sean@paywithivy.com';
    $scope.password = 'haisean';

    $scope.login = function(email, password) {
      Session
        .create(email, password)
        .then(function(result) {
          $location.path('/home');
        });
    }
  }]);
