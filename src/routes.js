const express = require('express');

const StudentController = require('./controllers/StudentController');
const SubjectController = require('./controllers/SubjectController');
const BookController = require('./controllers/BookController');
const ThemeController = require('./controllers/ThemeController');
const ActivityController = require('./controllers/ActivityController');

const routes = express.Router();

routes.get('/student', StudentController.index);
routes.post('/students', StudentController.store);

routes.get('/all', SubjectController.indexAll);
routes.get('/subjects', SubjectController.index);
routes.post('/students/:studentId/subject', SubjectController.store);

routes.get('/books', BookController.index);
routes.post('/students/:subjectId/book', BookController.store);

routes.post('/students/:bookId/theme', ThemeController.store);

routes.post('/students/:themeId/activity', ActivityController.store);
routes.post('/activity/update', ActivityController.update);

module.exports = routes;