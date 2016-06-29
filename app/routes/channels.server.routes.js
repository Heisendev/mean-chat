var users = require('../../app/controllers/users.server.controller'),
	messages = require('../../app/controllers/messages.server.controller'),
  channels = require('../../app/controllers/channels.server.controller');

module.exports = function(app){
	app.route('/api/channels')
		.get(channels.list)
		.post(users.requiresLogin, channels.create);

	app.route('/api/articles/:channelId')
		.get(channels.read)
		.put(users.requiresLogin, messages.create, channels.update)
		.delete(users.requiresLogin, channels.hasAuthorization, channels.delete);
    //TODO: will need to delete all orphan messages

	app.param('articleId', channels.channelByID);
};
