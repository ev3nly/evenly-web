'use strict';


Evenly.controller('HomeCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
  // Session.create('seansu4you87@gmail.com', 'ilye2yu2')
  
  Restangular.all('sessions')
    .post({email:'seansu4you87@gmail.com', password: 'ilye2yu2'})
    .then(function(result){
      alert('hello');
      console.log(result);
    }, function(response) {
      console.log("There was an error ", response);
    });
  

  // Restangular.one('meta', '').get()
  //   .then(function(result){
  //     console.log(result['version']);
  //   }, function(response) {
  //     console.log("There was an error ", response);
  //   });
}]);
