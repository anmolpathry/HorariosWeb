"user strict";

const express = require('express');
const router = express.Router();
const path = require('path');
const validateUtils = require('./validate_utils');
const userHandler = require('./user_handler');
const classHandler = require('./class_handler');
const subjectHandler = require('./subject_handler');

router.use('/users', validateUtils.validateUser);
router.use('/subjects', validateUtils.validateAdmin);
router.use('/classes', validateUtils.validateAdmin);

//USERS
router.route('/users/')
  .get((req, res) => userHandler.getUsers(req, res))
  .post((req, res) => userHandler.createUser(req, res));

router.route('/users/:email')
  .get((req, res) => userHandler.getUserByEmail(req, res))
  .put((req, res) => userHandler.updateUser(req, res));

//CLASSES
router.route('/classes/')
    .get((req, res) => classHandler.getClasses(req, res))
    .post((req, res) => classHandler.createClass(req, res));

router.route('/classes/:code')
    .get((req, res) => classHandler.getClassByCode(req, res))
    .put((req, res) => classHandler.updateClass(req, res))
    .delete((req, res) => classHandler.deleteClass(req, res));

//SUBJECTS
router.route('/subjects/')
    .get((req, res) => subjectHandler.getSubjects(req, res))
    .post((req, res) => subjectHandler.createSubject(req, res));

router.route('/subjects/:name')
  .get((req, res) => subjectHandler.getSubjectByName(req, res))
  .put((req, res) => subjectHandler.updateSubject(req, res))
  .delete((req, res) => subjectHandler.deleteSubject(req, res));

//VIEWS
router.get('/:var(home)?', (req, res) => {
    res.sendFile(path.join(__dirname, "../Views/home.html"));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "../Views/login.html"));
});

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, "../Views/signup.html"));
});

router.get('/change-password', (req, res) => {
    res.sendFile(path.join(__dirname, "../Views/changepassword.html"));
});

router.get('/manage-schedule', (req, res) => {
    res.sendFile(path.join(__dirname, "../Views/manage_schedule.html"));
});

router.get('/admin-subjects', (req, res) => {
    res.sendFile(path.join(__dirname, "../Views/admin_subjects.html"));
});

router.get('/admin-classes', (req, res) => {
    res.sendFile(path.join(__dirname, "../Views/admin_classes.html"));
});

module.exports = router;