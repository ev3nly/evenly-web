'use strict';

angular.module('evenlyApp')
  .controller('SplashCtrl', ['$scope', function ($scope) {
    $scope.carouselInterval = 10000;
    
    $scope.slides = [
      {image: '/images/splash-carousel-1.gif',text: 'Kitten.'},
      {image: '/images/splash-carousel-2.gif',text: 'Kitty!'},
      {image: '/images/splash-carousel-3.gif',text: 'Cat.'}
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
        description: 'No more hassling friends and groups.  Easily collect money from one person or a hundre.  Track and send reminders with one click.',
        image: '/images/dawwww.jpg'
      },
      {
        title: 'Deposit in seconds.',
        description: 'Whenever you\'d like, quickly and easily deposit the cash in your Evenly wallet into your bank account.',
        image: '/images/dawwww.jpg'
      }
    ];
  }]);
