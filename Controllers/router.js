"user strict";

const express = require('express');
const router = express.Router();
const userRouter = require('../routes/users');
const subjectRouter = require('../routes/subjects');
const classRouter = require('../routes/classes');
const path = require('path');

router.use('/users', validateUser, userRouter);
router.use('/subjects', validateAdmin, subjectRouter);
router.use('/classes', validateAdmin, classRouter);

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

function validateAdmin(req, res, next) {
    //
}

function validateUser(req, res, next) {
    //
}

module.exports = router;