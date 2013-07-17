'use strict';

var Evenly = angular.module('evenlyApp', ['restangular', 'ngCookies', 'ui.bootstrap', 'ui.validate', 'Payment']);

Evenly.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
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
    .when('/jobs', {
      templateUrl: 'views/jobs.html',
      controller: 'JobsCtrl'
    })
    .when('/faq', {
      templateUrl: 'views/faq.html',
      controller: 'FaqCtrl'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'SignupCtrl'
    })
    .when('/terms', {
      templateUrl: 'views/terms.html',
      controller: 'TermsCtrl'
    })
    .when('/privacy', {
      templateUrl: 'views/privacy.html',
      controller: 'PrivacyCtrl'
    })
    .otherwise({
      redirectTo: '/splash'
    });

    // $locationProvider.html5Mode(true);
}]);

Evenly.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true; // CORS
  delete $httpProvider.defaults.headers.common['X-Requested-With']; // CORS

  var interceptor = ['$rootScope', '$q', function($rootScope, $q) {
    var success = function(response) {
      console.log(response.config.method + ' ' + response.config.url + ' Successful');
      return response;
    };

    var error = function(response) {
      var status = response.status;
      // $log.error(response.config.method + ' ' + response.config.url + ' failed with ' + status);
      if (status === 401) {
        alert('Your session has ended.  Please login again');
        $.removeCookie('__evvt');
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

Evenly.run(['$location', '$rootScope', 'Me', 'Session', '$http', function($location, $rootScope, Me, Session, $http) {
  $http.defaults.headers.common['Authorization'] = Session.getAuthenticationToken();

  $rootScope.showNav = true;
  $rootScope.$watch('showNav', function(value) {
    if (value) {
      $('body').css('padding-top', '77');
    } else {
      $('body').css('padding-top', '0');
    }
  });

  $rootScope.$on('event:loginRequired', function() {
    console.warn('Login Required!');
    $location.path('/splash');
  });

  $rootScope.$on('$routeChangeStart', function() {
    var resizeHeight = function(selector) {
      var screenHeight = $(document).height();
      $('.static').css('height', screenHeight);
      console.log("resizing");
    }

    console.log("route has changed!");

    switch($location.path()) {
      case "/story":
      case "/contact":
      case "/faq":
      case "/jobs":
      case "/login":
      case "/signup":
      case "/terms":
      case "/privacy":
        $('.container').css('width', '100%');
        break;
      default:
        $('.container').css('width', '940px');
        break;
    }
  })

  $rootScope.refreshMe = function() {
    Me.get()
      .then(function(me) {
        $rootScope.me = me;
        $rootScope.me.firstName = function() {
          return $rootScope.me.name.split(' ')[0];
        };
      });
  };

  switch($location.path()) {
    case "/story":
    case "/contact":
    case "/faq":
    case "/jobs":
    case "/login":
    case "/splash":
    case "/signup":
    case "/terms":
    case "/privacy":
      break;
    default:
      $rootScope.refreshMe();
      break;
  }
}]);

window.Evenly = Evenly;