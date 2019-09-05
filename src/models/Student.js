const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
	name: {
		type: String,
	},
	user: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
	}
}, {
	timestamps: true,
});

module.exports = model('Student', studentSchema);