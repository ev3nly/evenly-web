'use strict';
/*global _:false */
/*jshint camelcase: false */

angular.module('evenlyApp')
  .controller('HistoryCtrl', ['$scope', 'Me', '$rootScope', function ($scope, Me, $rootScope) {
    $rootScope.loadHistory = function() {
      Me.history()
        .then(function(history) {
          $rootScope.history = _.map(history, function(item) {

            item.formattedDate = Date.parse(item.created_at).toString('MMM dd').toUpperCase();
            item.amountClass = (item.amount_sign === '-') ? 'history-item-amount-sent' : 'history-item-amount-received';
            item.amountString = item.amount_sign + '$' + Number(item.amount).toFixed(2);

            return item;
          });

        });
    };

    $scope.loadHistory();
  }]);
