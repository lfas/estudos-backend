const { Subject, Book } = require('../models/Subject');

//Controller de Apostilas
module.exports = {
	async index(req, res) {
		const { subject } = req.headers;

		const targetSubject = await Subject.findById(subject);

		const books = await Book.find({ subject_id: targetSubject._id });

		return res.json(books);
	},

	async store(req, res) {
		const { subjectId: subject_id } = req.params;
		const { name } = req.headers;

		const targetSubject = await Subject.findById(subject_id);

		const bookExists = await Book.findOne({ 
			$and: [
				{ subject_id: targetSubject._id },
				{ name }
			]
		}); 

		if(bookExists){
			return res.json(bookExists);
		};

		const bookCreated = await Book.create({
			subject_id,
			name
		});

		targetSubject.books.push(bookCreated);
		await targetSubject.save();

		return res.json(bookCreated);
	}
};