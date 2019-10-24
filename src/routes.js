const express = require('express');

const StudentController = require('./controllers/StudentController');

const SubjectController = require('./controllers/SubjectController');
const ActivityController = require('./controllers/ActivityController');

const routes = express.Router();

routes.get('/student', StudentController.index);
routes.post('/students', StudentController.store);

routes.get('/all', SubjectController.indexAll);
routes.get('/subjects', SubjectController.index);
routes.post('/students/:studentId/subject', SubjectController.store);

routes.post('/students/:subjectId/activity', ActivityController.store);
routes.post('/activity/update', ActivityController.update);

module.exports = routes;