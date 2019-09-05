const { Schema, model } = require('mongoose');

const subjectSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	student_id: {
		type: Schema.Types.ObjectId,
		ref: 'Student'
	},
	books: [{
		type: Schema.Types.ObjectId,
		ref: 'Book'
	}]
});

const bookSchema = new Schema({
	subject_id: {
		type: Schema.Types.ObjectId,
		ref: 'Subject'
	},
	name: String,
	themes: [{
		type: Schema.Types.ObjectId,
		ref: 'Theme'
	}]
});

const themeSchema = new Schema({
	book_id: {
		type: Schema.Types.ObjectId,
		ref: 'Book'
	},
	name: String,
	activities: [{
		type: Schema.Types.ObjectId,
		ref: 'Activity'
	}]
});

const activitySchema = new Schema({
	theme_id: {
		type: Schema.Types.ObjectId,
		ref: 'Theme'
	},
	class_number: String,
	page: String,
	ad: {
		type: Boolean,
		default: false
	},
	tm: {
		type: Boolean,
		default: false
	},
	tc: {
		type: Boolean,
		default: false
	},
	td: {
		type: Boolean,
		default: false
	}
});

const Subject = model('Subject', subjectSchema);
const Book = model('Book', bookSchema);
const Theme = model('Theme', themeSchema);
const Activity = model('Activity', activitySchema);

const SubjectSchemas = {
	Subject,
	Book,
	Theme,
	Activity
}

module.exports = SubjectSchemas;