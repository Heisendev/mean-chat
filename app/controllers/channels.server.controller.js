var mongoose = require('mongoose'),
		Channel = mongoose.model('Channel');

exports.channelByID = function(req, res, next, id){
	Channel.findById(id).populate('creator', 'username').exec(function(err, channel){
		if(err) return next(err);
		if(!channel) return next(new Error('Failed to load channel' + id));
		req.channel = channel;
		next();
	});
};

exports.addMessage = function(req, res){
	var channel = req.channel;
	var message = req.message;
	Channel.findByIdAndUpdate(
	    channel._id,
	    {$push: {"messages": {msg: message}}},
	    {safe: true, upsert: true},
	    function(err, model) {
	        console.log(err);
	    }
	);
}
