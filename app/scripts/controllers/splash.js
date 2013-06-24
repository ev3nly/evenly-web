'use strict';

angular.module('evenlyApp')
  .controller('SplashCtrl', ['$scope', function ($scope) {
    $scope.myInterval = 5000;
    $scope.slides = [
      {image: 'http://placekitten.com/200/200',text: 'Kitten.'},
      {image: 'http://placekitten.com/225/200',text: 'Kitty!'},
      {image: 'http://placekitten.com/250/200',text: 'Cat.'},
      {image: 'http://placekitten.com/275/200',text: 'Feline!'}
    ];
    $scope.addSlide = function() {
      $scope.slides.push({
        image: 'http://placekitten.com/'+(200+25*Math.floor(Math.random()*4))+'/200',
        text: ['More','Extra','Lots of','Surplus'][Math.floor(Math.random()*4)] + ' ' +
        ['Cats', 'Kittys', 'Felines', 'Cutes'][Math.floor(Math.random()*4)]
      });
    };

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
