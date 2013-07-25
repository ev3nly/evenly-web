'use strict';
/*jshint sub: true */
/*global Evenly:false */
/*jshint unused: vars */
/* jshint camelcase: false */

Evenly.factory('Session', ['Restangular', '$rootScope', '$http', '$timeout', function(Restangular, $rootScope, $http, $timeout) {
  var tokenKey = '__evvt';
  var setAuthenticationToken = function(token) {
    var expiry = new Date();
    var time = expiry.getTime();
    var expirationTime = 30 * 60 * 1000;
    time += expirationTime;
    expiry.setTime(time);

    $.cookie(tokenKey, token, { expires: expiry });

    // alert('setting token: ' + token);
    $http.defaults.headers.common['Authorization'] = token;

    $timeout(function() {
      $http.defaults.headers.common['Authorization'] = "";      
    }, expirationTime);
  };

  var getAuthenticationToken = function() {
    return $.cookie(tokenKey);
  };

  return {
    create: function(email, password) {
      return Restangular
        .all('sessions')
        .post({email:email, password: password})
        .then(function(result) {
          console.debug('Session retrieved: ' + result.authentication_token);

          setAuthenticationToken(result.authentication_token);
          return result;
        });
    },
    destroy: function() {
      return Restangular.one('sessions', '')
        .remove();
    },
    setAuthenticationToken: setAuthenticationToken,
    getAuthenticationToken: getAuthenticationToken,
    deleteAuthenticationToken: function() {
      return $.removeCookie(tokenKey);
    },
    refreshAuthenticationToken: function() {
      var token = getAuthenticationToken();
      setAuthenticationToken(token);
    }
  };
}]);

Evenly.factory('User', ['Restangular', function(Restangular) {
  return {
    create: function(params) {
      return Restangular.all('users')
        .post(params);
    },
    all: function(query) {
      return Restangular.all('users')
        .getList({query: query});
    }
  };
}]);

Evenly.factory('Me', ['Restangular', function(Restangular) {
  var base = Restangular.one('me', '');

  return {
    get: function() {
      return base.get();
    },
    put: function(params) {
      return base
        .put(params);
    },
    getNotificationSettings: function() {
      return base
        .getList('notifications');
    },
    putNotificationSettings: function(params) {
      return base.customPUT('notifications', params)
    },
    timeline: function(params) {
      return base
        .getList('timeline');
    },
    newsfeed: function(params) {
      return base
        .getList('newsfeed');
    },
    history: function(params) {
      return base
        .getList('history');
    },
    pending: function(params) {
      return base
        .getList('pending');
    }
  };
}]);

Evenly.factory('Payment', ['Restangular', function(Restangular) {
  return {
    create: function(params) {
      return Restangular.all('payments')
        .post(params);
    }
  };
}]);

Evenly.factory('Request', ['Restangular', function(Restangular) {
  return {
    create: function(params) {
      return Restangular.all('charges')
        .post(params);
    },
    remind: function(id) {
      return Restangular.one('charges', id)
        .customPOST('remind');
    },
    cancel: function(id) {
      return Restangular.one('charges', id)
        .customPUT('cancel');
    },
    complete: function(id) {
      return Restangular.one('charges', id)
        .customPUT('complete');
    },
    deny: function(id) {
      return Restangular.one('charges', id)
        .customPUT('deny');
    }
  };
}]);

Evenly.factory('Deposit', ['Restangular', function(Restangular) {
  return {
    create: function(params) {
      return Restangular.all('withdrawals')
        .post(params);
    }
  };
}]);

Evenly.factory('CreditCard', ['Restangular', function(Restangular) {
  return {
    all: function() {
      return Restangular.all('creditcards')
        .getList();
    },
    create: function(params) {
      return Restangular.all('creditcards')
        .post(params);
    },
    destroy: function(id) {
      return Restangular.one('creditcards', id)
        .remove();
    },
    activate: function(id) {
      return Restangular.one('creditcards', id)
        .customPUT('activate');
    }
  };
}]);

Evenly.factory('BankAccount', ['Restangular', function(Restangular) {
  return {
    all: function() {
      return Restangular.all('bankaccounts')
        .getList();
    },
    create: function(params) {
      return Restangular.all('bankaccounts')
        .post(params);
    },
    destroy: function(id) {
      return Restangular.one('bankaccounts', id)
        .remove();
    },
    activate: function(id) {
      return Restangular.one('bankaccounts', id)
        .customPUT('activate');
    }
  };
}]);

Evenly.factory('Story', ['Restangular', function(Restangular) {
  return {
    like: function(storyId) {
      return Restangular.one('stories', storyId)
        .customPOST('likes');
    },
    unlike: function(storyId) {
      return Restangular.one('stories', storyId)
        .customDELETE('likes');
    }
  };
}]);