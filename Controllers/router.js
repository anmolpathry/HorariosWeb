"user strict";

require('dotenv').config()
const express = require('express');
const router = express.Router();
const path = require('path');
const validateUtils = require('./validate_utils');
const userHandler = require('./user_handler');
const groupHandler = require('./group_handler');
const subjectHandler = require('./subject_handler');

router.use('/users', validateUtils.validateUser);
router.use('/subjects', validateUtils.validateAdmin);
router.use('/groups', validateUtils.validateAdmin);

//USERS
router.route('/users/')
  .get((req, res) => userHandler.getUsers(req, res))
  .post((req, res) => userHandler.createUser(req, res));

router.route('/users/:email')
  .get((req, res) => userHandler.getUserByEmail(req, res))
  .put((req, res) => userHandler.updateUser(req, res));

//GROUPS
router.route('/groups/')
    .get((req, res) => groupHandler.getGroups(req, res))
    .post((req, res) => groupHandler.createGroup(req, res));

router.route('/groups/:code')
    .get((req, res) => groupHandler.getGroupByCode(req, res))
    .put((req, res) => groupHandler.updateGroup(req, res))
    .delete((req, res) => groupHandler.deleteGroup(req, res));

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