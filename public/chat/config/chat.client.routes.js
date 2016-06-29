angular.module('chat').config(['$routeProvider',
  function($routeProvider){
    $routeProvider
      .when('/chat/:channel', {
        templateUrl: 'chat/views/chat.client.view.html'
      });
  }
]);
