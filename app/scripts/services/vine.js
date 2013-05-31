'use strict';

Evenly.factory('Session', ['Restangular', function(Restangular) {
  return {
    create: function(email, password) {
      Restangular.all('sessions').post({email:email, password: password});
    },
    destroy: function() {
      Restangular.one('sessions', '').remove();
    }
  };
}]);

Evenly.factory('User', ['Restangular', function(Restangular) {
  return {
    create: function(params) {
      Restangular.all('users').post(params);
    },
    all: function(query) {
      Restangular.all('users').getList();
    },
    me: function() {
      Restangular.one('me', '').get();
    }
  }
}]);