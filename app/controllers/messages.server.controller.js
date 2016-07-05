var mongoose = require('mongoose'),
    Message = mongoose.model('Message');

var getErrorMessage = function(err) {
  var message = '';

  if (err.errors) {
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};

exports.messageByID = function(req, res, next, id){
  Message.findById(id).populate('creator', 'username color').exec(function(err, message){
    if(err) return next(err);
    if(!message) return next(new Error('Failed to load channel' + id));
    req.message = message;
    next();
  });
};

exports.create = function(req, res, next) {
  var message = new Message(req.body);
  message.creator = req.user;

  message.save(function(err) {
    if (err) {
      console.log('piou piou');
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      req.message = message;
      next();
    }
  });
};

exports.read = function(req, res){
  res.json(req.message);
};
