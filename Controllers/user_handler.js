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

    User.findOne({ email: `${email}` })
        .then(user => {
            let token = user.generateToken(password);
            //console.log(token)
            if (token != undefined) {
                res.status(200)
                res.json({"token": token,"role": user.role, "email": user.email});
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
    let email = req.params.email;
    let newSchedule = req.body;
 
    User.findOneAndUpdate(
        {email:`${email}`}, 
        { $push: { 'schedules': 
            {
                "name": newSchedule.name,
                "groups": newSchedule.groups,
                "period": newSchedule.period    
            }
        }}, (err, result) => {
            console.log(err);
    });

    User.findOne({ email: `${email}` }).select('schedules -_id')
        .then((schedule) => {
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(`Schedule ${newSchedule.name} was created!`);
    });
}

function getScheduleByName(req, res) {
    let email = req.params.email;
    let name = req.params.name;
    User.findOne({email:`${email}`, "schedules.name":`${name}`},{ "schedules.$": 1 }).select('-_id')
        .then(schedule => res.status(200).json(schedule.schedules[0]))
        .catch(err => {
            res.status(404);            
            res.set('Content-Type', 'text/plain; charset=utf-8');
            res.send(`Schedule not found`);
        });
}

function updateSchedule(req, res) {
    let email = req.params.email;
    let name = req.params.name;
    let updatedSchedule = req.body;
    for (let property in updatedSchedule) {
        if (['name','period','groups'].includes(property)) continue;
        delete updatedSchedule[property];
    }
    User.findOneAndUpdate({ email: `${email}`, "schedules.name":`${name}`}, {
        $set: {
            schedules: { name: `${name}`},
            
        }}
    ).then(user => {
        res.type('text/plain; charset=utf-8');
        res.send(`${user.name}'s schedule ${name} was deleted`);
    }).catch(err => {
        res.status(404);            
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(`Schedule not found`);
    });
}/**/

function deleteSchedule(req, res) {
    let email = req.params.email;
    let name = req.params.name;
    
    User.findOneAndUpdate({ email: `${email}` }, {
        $pull: {
            schedules: { name: `${name}`},
        }}, {safe:true, multi:false}
    ).then(user => {
        res.type('text/plain; charset=utf-8');
        res.send(`${user.name}'s schedule ${name} was deleted`);
    }).catch(err => {
        res.status(404);            
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(`Schedule not found`);
    });

}
/*
function addGroupToSchedule(req, res) {
    let email = req.params.email;
    let name = req.params.name;
    let groupCode = req.params.groupCode;
    User.findOne({ email: `${email}` }).schedules.groups.push(schedule);
    User.save().then((schedule) => {
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(`Schedule ${schedule.name} was created!`);
    });
}

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

exports.getSchedules = getSchedules;
exports.createSchedule = createSchedule;
exports.getScheduleByName = getScheduleByName;
exports.updateSchedule = updateSchedule;
exports.deleteSchedule = deleteSchedule;
/*exports.createSchedule = createSchedule;
*/