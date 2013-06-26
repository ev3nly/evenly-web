'use strict';

angular.module('evenlyApp')
  .controller('SplashCtrl', ['$scope', function ($scope) {
    $scope.carouselInterval = 7500;
    
    $scope.slides = [
      {image: '/images/splash-carousel-1.gif',text: 'Kitten.'},
      {image: '/images/splash-carousel-2.gif',text: 'Kitty!'},
      {image: '/images/splash-carousel-3.gif',text: 'Cat.'},
      {},
      {}
    ];

    $scope.taglines = [
      {},
      {},
      {}
    ];

    $scope.brochures = [
      {
        title: 'No cash? No problem.',
        description: 'Add a credit or debit card to your Evenly wallet to send money to anyone, anywhere, at any time.',
        image: '/images/dawwww.jpg'
      },
      {
        title: 'Get paid back faster.',
        description: 'No more hassling friends and groups.  Easily collect money from one person or a hundred.  Track and send reminders with a single tap.',
        image: '/images/dawwww.jpg'
      },
      {
        title: 'Deposit in seconds.',
        description: 'Quickly and easily deposit the cash from your Evenly wallet into your bank account.',
        image: '/images/dawwww.jpg'
      }
    ];
  }]);
