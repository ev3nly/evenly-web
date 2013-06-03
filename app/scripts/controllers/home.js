'use strict';


Evenly.controller('HomeCtrl', ['$scope', 'Session', function ($scope, Session) {
  Session.create('sean@paywithivy.com', 'haisean')
    .then(function(result){
      alert('hello');
      console.log(result);
    }, function(response) {
      console.log("There was an error ", response);
    });
  
  // Restangular.all('sessions')
  //   .post({email:'sean@paywithivy.com', password: 'haisean'})
  //   .then(function(result){
  //     alert('hello');
  //     console.log(result);
  //   }, function(response) {
  //     console.log("There was an error ", response);
  //   });
  
  // Restangular.one('meta', '').get()
  //   .then(function(result){
  //     console.log("success");
  //     console.log(result['version']);
  //   }, function(response) {
  //     console.log("There was an error ", response);
  //   });
}]);
