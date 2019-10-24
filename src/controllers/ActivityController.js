const { Subject, Activity } = require('../models/Subject');

//Controller de Temas
module.exports = {
	async store(req, res) {
		const { subjectId: subject_id } = req.params;
		const { theme } = req.headers;

		const targetSubject = await Subject.findById(subject_id);

		const activityExists = await Activity.findOne({ 
			$and: [
				{ subject_id: targetSubject._id },
				{ theme }
			]
		}); 

		if(activityExists){
			return res.json(activityExists);
		};

		const activiyCreated = await Activity.create({
			subject_id,
      theme
		});

		targetSubject.activities.push(activiyCreated);
		await targetSubject.save();

		return res.json(activiyCreated);
	},

	async update(req, res) {
		const { activity_id, activity_type, activity_value } = req.headers;

		// let value = activity_value ? false : true;
		
		// console.log(value);

		const targetActivity = await Activity.findById(activity_id);

		switch(activity_type) {
			case 'es':
				targetActivity.es = activity_value;
				await targetActivity.save();

				break;
			case 'ec':
				targetActivity.ec = activity_value;
				await targetActivity.save();
				
				break;
		}	

		return res.json({ targetActivity });
	}
};