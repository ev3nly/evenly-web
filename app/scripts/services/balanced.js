'use strict';

angular.module('evenlyApp')
  .factory('balanced', [function() {
    var devUri = '/v1/marketplaces/TEST-MP6oLyrmIAAsRrnzFWmWAQxo';
    balanced.init(devUri);

    return {
      tokenizeCard: function(card, callback) {
        var cardData = {
          card_number: card.number,
          expiration_month: card.expiry.split("/")[0],
          expiration_year: "20" + card.expiry.split("/")[1].trim(),
          security_code: card.cvc
        };

        balanced.card.create(cardData, function(response) {
          alert(response.status);
          console.log(response);
        });
      }
    }
  }]);
