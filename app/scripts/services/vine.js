'use strict';

Evenly.factory('Session', ['Restangular', function(Restangular) {
  return {
    create: function(email, password) {
      return Restangular.all('sessions').post({email:email, password: password});
    },
    destroy: function() {
      return Restangular.one('sessions', '').remove();
    }
  };
}]);

Evenly.factory('User', ['Restangular', function(Restangular) {
  return {
    create: function(params) {
      return Restangular.all('users').post(params);
    },
    all: function(query) {
      return Restangular.all('users').getList();
    },
    me: function() {
      return Restangular.one('me', '').get();
    }
  }
}]);