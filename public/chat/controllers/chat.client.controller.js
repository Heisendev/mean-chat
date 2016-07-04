angular.module('chat').controller('ChatController', ['$scope', 'Authentication', '$location', '$routeParams', 'Socket','UsersAPI',  'Channels', 'Messages',
  function($scope, Authentication, $location, $routeParams, Socket, UsersAPI, Channels, Messages){

    $scope.user = Authentication.user;
    $scope.channel = $routeParams.channel;
    $scope.glued = true;

    $scope.messages = [];

    $scope.users = UsersAPI.query();
    var messagesChan = Messages.query({channelId: $scope.channel}, function(res){
      res.forEach(function(el){
        $scope.messages.push(el);
      });
    });
    //si il n'y a pas de channel on en créé un par défaut : Général
    $scope.channels = Channels.query(function(result){
      if(result.length === 0){
        var channel = new Channels({
          name: 'general'
        });

        channel.$save(function(response){
          $scope.channels.push(response);
        }, function(errorResponse){
          $scope.error = errorResponse.data.message;
        });
      }
    });

    $scope.keyPressed = function(event){
      if(event.target.value.length === 0 && event.which === 13){
        event.preventDefault();
      }
      else if(event.which === 13 && !event.shiftKey && !event.altKey){
        event.preventDefault();
        var msg = {
          text: event.target.value
        };
        var message = new Messages({channelId: $scope.channel, text: msg.text});
        message.$save(function(){
        }, function(errorResponse){
          console.log('error', errorResponse);
          $scope.error = errorResponse.data.message;
        });
        $scope.messageText = '';
        Socket.emit('chatMessage', msg);
      }
    };

    Socket.on('chatMessage', function(message){
      console.log(message);
      $scope.messages.push(message);
    });

    Socket.on('conection', function(user){
      for (var i = 0, len = $scope.users.length; i < len; i++) {
        if($scope.users[i].id === user.creator.id){
          $scope.users[i].isConnected = true;
        }
      }
    });

    $scope.$on('$destroy', function(){
      Socket.removeListener('chatMessage');
    });

    $scope.createChannel = function(){
      var channel = new Channels({
        name: this.name
      });
      channel.$save(function(response){
        $scope.channels.push(response);
      }, function(errorResponse){
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.listChannel = function(){
      $scope.channels = Channels.query();
    };

    $scope.removeChannel = function(channel){
      console.log(channel);
      if(channel){
        channel.$remove(function(){
         for (var i in $scope.channels){
          if($scope.channels[i] === channel){
            $scope.channels.splice(i, 1);
          }
         }
        });
      }
    };
  }
]);
