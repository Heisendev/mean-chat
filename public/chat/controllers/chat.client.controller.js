angular.module('chat').controller('ChatController', ['$scope', '$location', '$routeParams', 'Socket', 'Channels', 'Messages',
  function($scope, $location, $routeParams, Socket, Channels, Messages){

    $scope.channel = $routeParams.channel || 'general';

    //si il n'y a pas de channel on en créé un par défaut : Général
    $scope.channels = Channels.query(function(result){
      console.log(arguments);
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

    $scope.messages = [];
    var messagesChan = Messages.query({channelId: $scope.channel}, function(res){
      res.forEach(function(el){
        $scope.messages.push(el);
      });
      console.log(arguments);
    });


    Socket.on('chatMessage', function(message){
      $scope.messages.push(message);
    });

    $scope.sendMessage = function(){
      var message = {
        text: this.messageText
      };
      Socket.emit('chatMessage', message);
      var msg = new Messages({channelId: $scope.channel, text: message.text});
      msg.$save(function(){
      }, function(errorResponse){
        console.log('error', errorResponse);
        $scope.error = errorResponse.data.message;
      });
      this.messageText = '';
    };

    $scope.createChannel = function(){
      var channel = new Channels({
        name: this.name
      });
      console.log(channel);

      channel.$save(function(response){
      }, function(errorResponse){
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.listChannel = function(){
      $scope.channels = Channels.query();
    };

    $scope.$on('$destroy', function(){
      Socket.removeListener('chatMessage');
    });
  }
]);
