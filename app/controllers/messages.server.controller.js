var mongoose = require('mongoose'),
    Message = mongoose.model('Message');


exports.create = function(req, res, next) {
  var message = new Message(req.body);
  message.creator = req.user;

  message.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      req.message = message;
      next();
    }
  });
};
