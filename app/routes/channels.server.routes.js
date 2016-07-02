var users = require('../../app/controllers/users.server.controller'),
	messages = require('../../app/controllers/messages.server.controller'),
  channels = require('../../app/controllers/channels.server.controller');

module.exports = function(app){
	app.route('/api/channels')
		.get(channels.list)
		.post(users.requiresLogin, channels.create);

	app.route('/api/channels/:channelId')
		.get(channels.read)
		.delete(users.requiresLogin, channels.hasAuthorization, channels.delete);
    //TODO: will need to delete all orphan messages
	
	app.route('/api/channels/:channelId/messages')
		.post(users.requiresLogin, messages.create, channels.addMessage)
		.get(users.requiresLogin, channels.listMessage);

	
	/*app.route('/api/channels/:channelId/messages/:messageId')
		.get(users.requiresLogin, messages.read);*/

	app.param('channelId', channels.channelByName);
	//app.param('messageId', messages.messageByID);
};
