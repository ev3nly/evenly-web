'use strict';

angular.module('evenlyApp')
  .controller('WalletCtrl', ['$scope', 'Me', function ($scope, Me) {
    
    $scope.showAddCardModal = function() {
      $scope.addCardShouldBeOpen = true;
    };  

    $scope.hideAddCardModal = function() {
      $scope.addCardShouldBeOpen = false;
    }

    $scope.showAddBankAccountModal = function() {
      $scope.addBankAccountShouldBeOpen = true;
    }

    $scope.hideAddBankAccountModal = function() {
      $scope.addBankAccountShouldBeOpen = false;
    }

    $scope.opts = {
      backdropFade: true,
      dialogFade: true,
      dialogClass: 'modal cc-modal'
    };
  }]);
