angular.module('chat').service('Socket', ['Authentication', '$location', '$timeout',
  function(Authentication, $location, $timeout){
      if(Authentication.user){
        this.socket = io();
      } else {
        $location.path('/');
      }
      this.on = function(eventName, callback){
        if(this.socket){
          this.socket.on(eventName, function(data){
            $timeout(function(){
              callback(data);
            });
          });
        }
      };

      this.emit = function(eventName, data){
        if(this.socket){
          this.socket.emit(eventName, data);
        }
      };

      this.removeListener = function(eventName){
        if(this.socket){
          this.socket.removeListener(eventName);
        }
      };
  }
]).factory('Channels', ['$resource',
  function($resource){
    return $resource('api/channels/:channelId', {channelId: '@_id'}, {
        update : {
          method: 'PUT'
        }
      }
    );
  }
]).factory('Messages', ['$resource',
  function($resource){
    return $resource('api/channels/:channelId/messages/:messageId', {channelId: '@channelId', messageId: '@_id'} , {
      update: {
        method: 'PUT'
      }
    });
  }
]);
