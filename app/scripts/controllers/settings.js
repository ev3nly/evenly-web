'use strict';

angular.module('evenlyApp')
  .controller('SettingsCtrl', ['$scope', function ($scope) {
    $scope.me = {
      name: 'Jabroni',
      email: 'jabroni@gmail.com',
      phone_number: '8503987609'
    };
  }]);
