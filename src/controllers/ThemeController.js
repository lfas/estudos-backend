const { Book, Theme } = require('../models/Subject');

//Controller de Temas
module.exports = {
	async store(req, res) {
		const { bookId: book_id } = req.params;
		const { name } = req.headers;

		const targetBook = await Book.findById(book_id);

		const themeExists = await Theme.findOne({ 
			$and: [
				{ book_id: targetBook._id },
				{ name }
			]
		}); 

		if(themeExists){
			return res.json(themeExists);
		};

		const themeCreated = await Theme.create({
			book_id,
			name
		});

		targetBook.themes.push(themeCreated);
		await targetBook.save();

		return res.json(themeCreated);
	}
};