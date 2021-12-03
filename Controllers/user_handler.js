"use strict";

const bcrypt = require('bcrypt');
const User = require('../Models/user').User
const Schedule = require('../Models/user').Schedule

function getUsers(req, res) {
    User.find({}).then(users => res.status(200).json(users));
}

function getUserByEmail(req, res) {
    let email = req.params.email;
    User.findOne({ email: `${email}` }).then(user => res.status(200).json(user));
}

function createUser(req, res) {
    let user = User(req.body);
    
    user.save().then((user) => {
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(`User ${user.name} was created!`);
        console.log(user);
    });
}

function updateUser(req, res) {
    let email = req.params.email;
    let updatedUser = req.body;

    for (let property in updatedUser) {
        if(['password'].includes(property)){
            updatedUser.password = bcrypt.hashSync(updatedUser.password, 10); 
            continue;
        }
        if (['name'].includes(property)) continue;
        delete updatedUser[property];
    }

    User.findOneAndUpdate({ email: `${email}` }, updatedUser, {new:true}).then(user => {
        res.type('text/plain; charset=utf-8');
        res.send(`User ${user.name} was updated!`);
    });
}


function login(req, res) {
    let email = req.email;
    let password = req.password;

    console.log(email + " " + password);
    
    User.findOne({ email: `${email}` })
        .then(user => {
            let token = user.generateToken(password);
            //console.log(token)
            if (token != undefined) {
                res.status(200)
                res.json({token, email});
            } else {
                res.status(404);            
                res.set('Content-Type', 'text/plain; charset=utf-8');
                res.send(`Wrong email or password`);
            }
        })
        .catch(err => {
            res.status(404);            
            res.set('Content-Type', 'text/plain; charset=utf-8');
            res.send(`Wrong email or password`);
        });
}

//User Schedules
function getSchedules(req, res) {
    let email = req.params.email;
    User.findOne({ email: `${email}` }).select('schedules -_id').then(schedules => res.status(200).json(schedules));
}

function createSchedule(req, res) {
    let schedule = Schedule(req.body);
    
    schedule.save().then((schedule) => {
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(`Schedule ${schedule.name} was created!`);
    });
}

function getScheduleByName(req, res) {
    let email = req.params.email;
    let name = req.params.name;
    Schedule.findOne({email:`${email}` }).findOne({name:`${name}`}).then(schedule => res.status(200).json(schedule));
}
/*
function updateSchedule(req, res) {
    let email = req.params.email;
    let name = req.params.name;
    let updatedSchedule = req.body;
    for (let property in updatedSchedule) {
        if (['name','period','groups'].includes(property)) continue;
        delete updatedSchedule[property];
    }
    User.findOneAndUpdate({ email: `${email}` }, updatedSchedule, {new:true}).then(user => {
        res.type('text/plain; charset=utf-8');
        res.send(`User ${user.name} was updated!`);
    });
}

router.route('/users/:email/:name')
    
    .delete((req, res) => userHandler.deleteSchedule(req, res))
    .put((req, res) => userHandler.updateSchedule(req, res));

router.route('/users/:email/:name/:group')
    .delete((req, res) => userHandler.deleteGroupFromSchedule(req, res));
router.route('/users/schedules/groups/')
    .get((req, res) => userHandler.getScheduleGroups(req, res));




*/


exports.getUsers = getUsers;
exports.getUserByEmail = getUserByEmail;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.login = login;
/*
exports.getSchedules = getSchedules;
exports.createSchedule = createSchedule;*/