const axios = require('axios');
const Student = require('../models/Student');

module.exports = {
	async index(req, res) {
		const { student } = req.headers;

		const loggedStudent = await Student.findById(student);

		return res.json(loggedStudent);
	},

	async store(req, res) {
		const { username } = req.body;

		const userExists = await Student.findOne({ user: username }); //Verificase o usuário já existe no banco de dados

		if(userExists){
			return res.json(userExists);
		};

		const response = await axios.get(`https://api.github.com/users/${username}`);
		const { name, avatar_url:avatar } = response.data; //Quais atributos eu quero pegar do JSON
		
		const student = await Student.create({
			name,
			user: username,
			avatar
		});

		return res.json(student);
	}
}