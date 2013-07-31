'use strict';

angular.module('evenlyApp')
  .controller('WalletCtrl', ['$scope', function ($scope) {
    $scope.showAddCardModal = function() {
      $scope.addCardShouldBeOpen = true;
    };

    $scope.hideAddCardModal = function() {
      $scope.addCardShouldBeOpen = false;
    };

    $scope.showAddBankAccountModal = function() {
      $scope.addBankAccountShouldBeOpen = true;
    };

    $scope.hideAddBankAccountModal = function() {
      $scope.addBankAccountShouldBeOpen = false;
    };

    $scope.showDepositModal = function() {
      $scope.depositShouldBeOpen = true;
    };

    $scope.hideDepositModal = function() {
      $scope.depositShouldBeOpen = false;
    };

    $scope.addCardOpts = {
      backdropFade: true,
      dialogFade: true,
      dialogClass: 'modal cc-modal'
    };

    $scope.addBankAccountOpts = {
      backdropFade: true,
      dialogFade: true,
      dialogClass: 'modal ba-modal'
    };

    $scope.selectHistory = function() {
      console.log('show history');
      $scope.showHistory = true;
      $scope.showCards = false;
      $scope.showBankAccounts = false;
    };

    $scope.selectCards = function() {
      console.log('show cards');
      $scope.showHistory = false;
      $scope.showCards = true;
      $scope.showBankAccounts = false;
    };

    $scope.selectBankAccounts = function() {
      console.log('show bank accounts');
      $scope.showHistory = false;
      $scope.showCards = false;
      $scope.showBankAccounts = true;
    };

    $scope.showHistory = true;
  }]);
