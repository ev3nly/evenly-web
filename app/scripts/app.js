'use strict';

var Evenly = angular.module('evenlyApp', ['restangular', 'ngCookies', 'ui.bootstrap', 'ui.validate', 'Payment']);

Evenly.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/main', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/splash', {
      templateUrl: 'views/splash.html',
      controller: 'SplashCtrl'
    })
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/wallet', {
      templateUrl: 'views/wallet.html',
      controller: 'WalletCtrl'
    })
    .when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl'
    })
    .when('/story', {
      templateUrl: 'views/story.html',
      controller: 'StoryCtrl'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'ContactCtrl'
    })
    .otherwise({
      redirectTo: '/home'
    });
}]);

Evenly.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true; // CORS
  delete $httpProvider.defaults.headers.common['X-Requested-With']; // CORS

  var interceptor = ['$rootScope', '$q', '$cookieStore', function($rootScope, $q, $cookieStore) {
    var success = function(response) {
      console.log(response.config.method + ' ' + response.config.url + ' Successful');
      return response;
    };

    var error = function(response) {
      var status = response.status;
      // $log.error(response.config.method + ' ' + response.config.url + ' failed with ' + status);
      if (status === 401) {
        $cookieStore.remove('__evvt');
        $rootScope.$broadcast('event:loginRequired');
      }
      return $q.reject(response);
    };

    return function(promise) {
      return promise.then(success, error);
    };
  }];

  $httpProvider.responseInterceptors.push(interceptor);
}]);

Evenly.config(['RestangularProvider', function(RestangularProvider) {
  // RestangularProvider.setBaseUrl('http://localhost\\:5000/api/v1');
  RestangularProvider.setBaseUrl('https://germ.herokuapp.com/api/v1');
  // RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
  //   console.log("hello dude!");
  //   alert("sheit up");
  //   return response.data;
  // });
}]);

Evenly.run(['$location', '$cookieStore', '$rootScope', 'Me', function($location, $cookieStore, $rootScope, Me) {
  if (!$cookieStore.get('__evvt')) {
    console.warn('NOT LOGGED IN');
    // $rootScope.$broadcast('event:loginRequired'); /* too slow... */
    $location.path('/splash');
  }

  $rootScope.$on('event:loginRequired', function() {
    console.warn('Login Required!');
    $location.path('/splash');
  });

  $rootScope.refreshMe = function() {
    Me.get()
      .then(function(me) {
        $rootScope.me = me;
        $rootScope.me.firstName = function() {
          return $rootScope.me.name.split(' ')[0];
        };
      });
  };

  $rootScope.refreshMe();
}]);

window.Evenly = Evenly;