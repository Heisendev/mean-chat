angular.module('chat').config(['$routeProvider',
  function($routeProvider){
    $routeProvider
      .when('/:channel', {
        templateUrl: 'chat/views/chat.html'
      }).otherwise({
      redirectTo: '/general'
    });
  }
]);
