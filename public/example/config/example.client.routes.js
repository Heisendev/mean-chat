angular.module('example').config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
      when('/', {
        templateUrl: 'example/views/example.clien.view.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
