'use strict';
/*global balanced:false */
/*jshint camelcase: false */

var defaultCallback = function(response) {
  switch (response.status) {
  case 201:
    // WOO HOO!
    // response.data.uri == uri of the card or bank account resource
    console.log('got em!');
    break;
  case 400:
    // missing field - check response.error for details
    console.error('missing fields');
    break;
  case 402:
    // we couldn't authorize the buyer's credit card
    // check response.error for details
    console.error('couldn\'t authorize the buyer\'s credit card');
    break;
  case 404:
    // your marketplace URI is incorrect
    console.error('incorrect marketplace URI');
    break;
  case 500:
    // Balanced did something bad, please retry the request
    console.error('retry');
    break;
  }
};

angular.module('evenlyApp')
  .factory('balanced', [function() {
    var devUri = '/v1/marketplaces/TEST-MP6oLyrmIAAsRrnzFWmWAQxo';
    var germUri = '/v1/marketplaces/TEST-MP2Hr48FkuOXqouGYxNBibAc';
    var prodUri = '/v1/marketplaces/MP4KYFmSZjnYzse0tPnu1s7l';
    balanced.init(germUri);

    return {
      tokenizeCard: function(card, callback) {
        var cardData = {
          card_number: card.number,
          expiration_month: card.expiry.split('/')[0],
          expiration_year: '20' + card.expiry.split('/')[1].trim(),
          security_code: card.cvc
        };

        balanced.card.create(cardData, function(response) {
          defaultCallback(response);
          if (callback) {
            callback(response);
          }
        });
      },
      tokenizeBankAccount: function(bankAccount, callback) {
        var bankAccountData = {
          name:           bankAccount.name,
          account_number: bankAccount.accountNumber,
          routing_number: bankAccount.routingNumber
        };

        balanced.bankAccount.create(bankAccountData, function(response) {
          defaultCallback(response);
          if (callback) {
            callback(response);
          }
        });
      }
    };
  }]);
