'use strict';

angular.module('evenlyApp')
  .controller('ConfirmationCtrl', ['$scope', 'Uri', function ($scope, Uri) {
    // http://www.paywithivy.com/users/confirmation.1044?confirmation_token=pAsarQpfhcTgKxnkJR67

    var params = Uri.getVariables('http://localhost:9000/#/confirmation?token=bullshit&user=141');
    console.log(params);
  }]);
