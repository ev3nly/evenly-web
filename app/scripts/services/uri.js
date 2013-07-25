'use strict';

angular.module('evenlyApp')
  .factory('Uri', [function() {
    var queryString = function(uri) {
      var components = uri.split('/');
      var queryString = _.last(_.last(components).split('?'));
      return queryString;
    };

    var getVariables = function(uri) {
      var params = {};
      var pairs = queryString(uri).split('&')
      _.each(pairs, function(pair) {
        var splitPair = pair.split('=');
        params[splitPair[0]] = splitPair[1];
      });
      return params;
    };

    return {
      queryString: queryString,
      getVariables: getVariables
    };
  }]);
