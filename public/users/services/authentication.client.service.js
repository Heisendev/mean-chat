angular.module('users').factory('Authentication', [
  function(){
    this.user = window.user;

    return {
      user: this.user
    };
  }
]).factory('UsersAPI', ['$resource',
  function($resource){
    return $resource('api/users/:userId', {userId: '@_id'} , {
      update: {
        method: 'PUT'
      }
    });
  }
]);

