const Student = require('../models/Student');
const { Subject } = require('../models/Subject');

//Controller de Matérias
module.exports = {
	async index(req, res) {
		const { student } = req.headers;

		const loggedStudent = await Student.findById(student);

		const subjects = await Subject.find({ student_id: loggedStudent._id });

		return res.json(subjects);
	},

	async indexAll(req, res) {
		const { student } = req.headers;

		const loggedStudent = await Student.findById(student);

		const subjects = await Subject.find({ student_id: loggedStudent._id })
			.populate({
				path: 'activities',
				model: 'Activity'	
			});

		return res.json(subjects);
	},

	async store(req, res) {
		const { studentId } = req.params;
		const { name } = req.headers;
		
		const loggedStudent = await Student.findById(studentId);

		const subjectExists = await Subject.findOne({ 
			$and: [
				{ student_id: loggedStudent._id },
				{ name }
			]
		}); 

		if(subjectExists){
			return res.json(subjectExists);
		};

		const subjectCreated = await Subject.create({
			name,
			student_id: loggedStudent._id
		});
		
		return res.json(subjectCreated);
	}
};