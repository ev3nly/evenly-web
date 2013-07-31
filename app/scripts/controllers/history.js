'use strict';
/*global _:false */
/*jshint camelcase: false */

angular.module('evenlyApp')
  .controller('HistoryCtrl', ['$scope', 'Me', '$rootScope', function ($scope, Me, $rootScope) {
    $rootScope.loadHistory = function() {
      Me.history()
        .then(function(history) {
          $rootScope.history = _.map(history, function(item) {
            if (item.class === 'Withdrawal') {
              item.verb = 'deposited into';
              item.subject = 'You';
              item.object = item.bank_name;
              item.topic = 'Deposit into ' + item.bank_name;
            } else { // Payment or SignUpPayment
              item.verb = 'paid';
              item.subject = (item.from !== 'me') ? item.from.name : 'You';
              item.object = (item.to !== 'me') ? item.to.name : 'You';
              item.topic = ((item.from === 'me') ? item.to.name : item.from.name) + ' · ' + item.description;
            }

            item.formattedDate = Date.parse(item.created_at);
            item.amountClass = (item.subject === 'You') ? 'history-item-amount-sent' : 'history-item-amount-received';

            var amountStringPrefix = (item.subject === 'You') ? '-$' : '+$';
            item.amountString = amountStringPrefix + Number(item.amount).toFixed(2);

            return item;
          });

        });
    };

    $scope.loadHistory();
  }]);
