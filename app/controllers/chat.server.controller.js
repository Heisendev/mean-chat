module.exports = function(io, socket){
  io.emit('chatMessage', {
    type: 'status',
    text: 'connected',
    created: Date.now(),
    creator: {
      username : socket.request.user.username
    }
  });

  io.emit('conection', {
    type: 'status',
    text: 'connected',
    created: Date.now(),
    creator: {
      id : socket.request.user.id
    }
  });

  socket.on('chatMessage', function(message){
    message.type = 'message';
    message.created = Date.now();
    message.creator = {
      username : socket.request.user.username
    };
    io.emit('chatMessage', message);
  });

  socket.on('disconnect', function(){
    io.emit('chatMessage', {
      type: 'status',
      text: 'disconnected',
      created: Date.now(),
      creator: {
        id : socket.request.user.id
        username : socket.request.user.username
      }
    });
  });
};
