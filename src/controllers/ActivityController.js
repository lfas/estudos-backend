const { Theme, Activity } = require('../models/Subject');

//Controller de Temas
module.exports = {
	async store(req, res) {
		const { themeId: theme_id } = req.params;
		const { class_number } = req.headers;
		const { page } = req.headers;

		const targetTheme = await Theme.findById(theme_id);

		const activityExists = await Activity.findOne({ 
			$and: [
				{ theme_id: targetTheme._id },
				{ class_number },
				{ page }
			]
		}); 

		if(activityExists){
			return res.json(activityExists);
		};

		const activiyCreated = await Activity.create({
			theme_id,
      class_number,
      page
		});

		targetTheme.activities.push(activiyCreated);
		await targetTheme.save();

		return res.json(activiyCreated);
	},

	async update(req, res) {
		const { activity_id, activity_type, activity_value } = req.headers;

		// let value = activity_value ? false : true;
		
		// console.log(value);

		const targetActivity = await Activity.findById(activity_id);

		switch(activity_type) {
			case 'ad':
				targetActivity.ad = activity_value;
				await targetActivity.save();

				break;
			case 'tm':
				targetActivity.tm = activity_value;
				await targetActivity.save();

				break;
			case 'tc':
				targetActivity.tc = activity_value;
				await targetActivity.save();

				break;
			case 'td':
				targetActivity.td = activity_value;
				await targetActivity.save();

				break;
		}	

		return res.json({ targetActivity });
	}
};