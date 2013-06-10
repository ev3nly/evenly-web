'use strict';

var defaultSuccessHandler = function(result) {
  return result;
};

var defaultErrorHandler = function(response) {
  console.error(response.status);
  console.error(response.data);
  alert(response.data.message);
};

Evenly.factory('Session', ['Restangular', '$rootScope', '$cookieStore', function(Restangular, $rootScope, $cookieStore) {
  return {
    create: function(email, password) {
      return Restangular
        .all('sessions')
        .post({email:email, password: password})
        .then(function(result) {
          console.debug("Session retrieved: " + result.authentication_token);

          $cookieStore.put('vine_token', result.authentication_token);
          $rootScope.authenticationToken = result.authentication_token;
          return result;
        }, defaultErrorHandler);
    },
    destroy: function() {
      return Restangular.one('sessions', '')
        .remove()
        .then(defaultSuccessHandler, defaultErrorHandler);
    }
  };
}]);

Evenly.factory('User', ['Restangular', function(Restangular) {
  return {
    create: function(params) {
      return Restangular.all('users')
        .post(params)
        .then(defaultSuccessHandler, defaultErrorHandler);
    },
    all: function(query) {
      return Restangular.all('users')
        .getList({query: query})
        .then(defaultSuccessHandler, defaultErrorHandler);
    },
    me: function() {
      return Restangular.one('me', '')
        .get()
        .then(defaultSuccessHandler, defaultErrorHandler);
    }
  };
}]);

Evenly.factory('Me', ['Restangular', '$rootScope', '$http', '$cookieStore', function(Restangular, $rootScope, $http, $cookieStore) {
  var base = Restangular.one('me', '');

  var authenticationToken = null;
  if ($cookieStore.get('vine_token') !== null) {
    authenticationToken = $cookieStore.get('vine_token');
  } else {
    authenticationToken = $rootScope.authenticationToken;
  }
  $http.defaults.headers.common['Authorization'] = authenticationToken;

  return {
    timeline: function(params) {
      return base
        .getList('timeline')
        .then(defaultSuccessHandler, defaultErrorHandler);
    },
    newsfeed: function(params, success, error) {
      if (!success) {
        success = defaultSuccessHandler;
      }

      if (!error) {
        error = defaultErrorHandler;
      }

      return base
        .getList('newsfeed')
        .then(success, error);
    }
  };
}]);

Evenly.factory('Payment', ['Restangular', function(Restangular) {
  return {
    create: function(params) {
      return Restangular.all('payments')
        .post(params)
        .then(defaultSuccessHandler, defaultErrorHandler);
    }
  };
}]);

Evenly.factory('Request', ['Restangular', function(Restangular) {
  return {
    create: function(params) {
      return Restangular.all('charges')
        .post(params)
        .then(defaultSuccessHandler, defaultErrorHandler);
    }
  }
}]);