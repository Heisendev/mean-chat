var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var MessageSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	text: {
		type: String,
		required: 'Mhh a message without a messageText: weird',
		default: '',
		trim: true
	},
	creator: {
    required: 'Give this message a parent dammit!',
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Message', MessageSchema);
