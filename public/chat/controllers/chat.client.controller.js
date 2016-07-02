angular.module('chat').controller('ChatController', ['$scope', 'Authentication', '$location', '$routeParams', 'Socket', 'Channels', 'Messages',
  function($scope, Authentication, $location, $routeParams, Socket, Channels, Messages){

    $scope.user = Authentication.user;
    $scope.channel = $routeParams.channel;

    $scope.messages = [];
    var messagesChan = Messages.query({channelId: $scope.channel}, function(res){
      res.forEach(function(el){
        console.log(el);
        $scope.messages.push(el);
      });
      console.log(arguments);
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
      if(event.which === 13 && !event.shiftKey && !event.altKey && event.target.value !== '\n'){
        var msg = {
          text: event.target.value
        };
        var message = new Messages({channelId: $scope.channel, text: msg.text});
        console.log(message);
        message.$save(function(){
          console.log('$save called', arguments);
        }, function(errorResponse){
          console.log('error', errorResponse);
          $scope.error = errorResponse.data.message;
        });
        Socket.emit('chatMessage', msg);
        $scope.messageText = '';
      }
    };


    Socket.on('chatMessage', function(message){
      $scope.messages.push(message);
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
        //TODO this shit doesn't work yet :(
        /*channel.$remove(function(){
         for (var i in $scope.channels){
         if($scope.channels[i] === channel){
         $scope.channels.splice(i, 1);
         }
         }
         });*/
      }
    };
  }
]);
