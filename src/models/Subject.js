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
	activities: [{
		type: Schema.Types.ObjectId,
		ref: 'Activity'
	}]
});

const activitySchema = new Schema({
	subject_id: {
		type: Schema.Types.ObjectId,
		ref: 'Subject'
	},
	theme: String,
	es: {
		type: Boolean,
		default: false
	},
	ec: {
		type: Boolean,
		default: false
	}
});

const Subject = model('Subject', subjectSchema);
const Activity = model('Activity', activitySchema);

const SubjectSchemas = {
	Subject,
	Activity
}

module.exports = SubjectSchemas;