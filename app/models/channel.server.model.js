var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var ChannelSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		required: 'Title cannot be blank',
		default: '',
		trim: true
	},
  messages: [
    msg: {
      type: Schema.ObjectId,
  		ref: 'Message'
    }
  ]
});

mongoose.model('Channel', ChannelSchema);
