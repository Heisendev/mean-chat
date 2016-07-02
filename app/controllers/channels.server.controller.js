var mongoose = require('mongoose'),
		Channel = mongoose.model('Channel');

exports.channelByName = function(req, res, next, name){
	console.log('in channelByName', name);
	Channel.findOne({name: name}).populate('creator', 'username fullName').exec(function(err, channel){
		if(err) return next(err);
		if(!channel) return next(new Error('Failed to load channel' + id));
		console.log('REALLY in channelByName', channel.name);
		req.channel = channel;
		next();
	});
};

exports.list = function(req, res){
	Channel.find().sort('-name').exec(function(err, channels){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(channels);
		}
	});
};

exports.create = function(req, res){
	var channel = new Channel(req.body);
	channel.creator = req.user;

	channel.save(function(err){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(channel);
		}
	});
};

exports.read = function(req, res){
	res.json(req.channel);
};

exports.delete = function(req, res){
	var channel = req.channel;
	channel.remove(function(err){
		if(err){
			return res.status(400).send({
				message: getErrorMessage()
			});
		} else {
			res.json(channel);
		}
	});
};

exports.addMessage = function(req, res){
	var channel = req.channel;
	var message = req.message;
	console.log("channel === ", req.body.channelId);
	Channel.findByIdAndUpdate(
	    channel.id,
	    {$push: {"messages": message}},
	    {safe: true, upsert: true},
	    function(err, model) {
		    if(!err){
			    res.json(message);
		    }
		    console.log('message added', message.text);
	    }
	);
};

exports.hasAuthorization = function(req, res, next){
	if(req.user.role !== 'Admin'){
		res.status(403).send({
			message: 'You don\'t have the sufficient permission'
		});
	}
	next();
};

exports.listMessage = function(req, res){
	Channel.findOne({name: req.channel.name}).populate('creator', 'username firstName lastName fullName').populate('messages').exec(function(err, channel){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			//console.log('test', channel);
			res.json(channel.messages);
		}
	});
};