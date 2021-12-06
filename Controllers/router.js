"user strict";

require('dotenv').config()
const express = require('express');
const router = express.Router();
const path = require('path');
const validateUtils = require('./validate_utils');
const userHandler = require('./user_handler');
const groupHandler = require('./group_handler');
const subjectHandler = require('./subject_handler');
/*
router.use('/home', validateUtils.validateUser);
router.use('/manage-schedule', validateUtils.validateUser);
router.use('/admin-subjects', validateUtils.validateAdmin);
router.use('/admin-groups', validateUtils.validateAdmin);*/

//LOGIN
router.route('/login')
    .post((req, res) => userHandler.login(req.body, res));
  
//USERS
router.route('/users/')
    .get((req, res) => userHandler.getUsers(req, res))
    .post((req, res) => userHandler.createUser(req, res));

router.route('/users/:email')
    .get((req, res) => userHandler.getUserByEmail(req, res))
    .put((req, res) => userHandler.updateUser(req, res));

//USERS SCHEDULES
router.route('/users/schedules/:email')
    .get((req, res) => userHandler.getSchedules(req, res))
    .post((req, res) => userHandler.createSchedule(req, res));

router.route('/users/schedules/:email/:schedName')
    .get((req, res) => userHandler.getScheduleByName(req, res))
    .delete((req, res) => userHandler.deleteSchedule(req, res))
    .put((req, res) => userHandler.updateSchedule(req, res));

router.route('/users/schedules/groups/:email/:schedName')
    .post((req, res) => userHandler.addGroupToSchedule(req, res))

router.route('/users/schedules/groups/:email/:schedName/:groupCode')
    .delete((req, res) => userHandler.deleteGroupFromSchedule(req, res));
    
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
router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, "../AJAX/home.html"));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "../AJAX/login.html"));
});

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, "../AJAX/signup.html"));
});

router.get('/change-password', (req, res) => {
    res.sendFile(path.join(__dirname, "../AJAX/changepassword.html"));
});

router.get('/manage-schedule', (req, res) => {
    res.sendFile(path.join(__dirname, "../AJAX/manage_schedule.html"));
});

router.get('/admin-subjects', (req, res) => {
    res.sendFile(path.join(__dirname, "../AJAX/admin_subjects.html"));
});

router.get('/admin-classes', (req, res) => {
    res.sendFile(path.join(__dirname, "../AJAX/admin_classes.html"));
}); 

module.exports = router;