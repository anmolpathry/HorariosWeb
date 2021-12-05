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
    User.findOne({ email: `${email}` }).select('schedules -_id').then(schedules => res.status(200).json(schedules))
    .catch(err => {           
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.status(404).send(`User not found`);
    });;
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
    }).then((user) => {
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(`Schedule ${newSchedule.name} was created!`);
    }).catch(err => {
        res.status(400);            
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(`Error creating schedule`);
    });
}

function getScheduleByName(req, res) {
    let email = req.params.email;
    let name = req.params.schedName;
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
    let name = req.params.schedName;
    let updatedSchedule = req.body;
    for (let property in updatedSchedule) {
        if (['name','period','groups'].includes(property)) continue;
        delete updatedSchedule[property];
    }
    
    User.findOneAndUpdate({ email: `${email}`, "schedules.name":`${name}`}, {
        $set: {
            "schedules.$.name": updatedSchedule.name, 
            "schedules.$.groups": updatedSchedule.groups, 
            "schedules.$.period": updatedSchedule.period
        }}
    ).then(user => {
        res.type('text/plain; charset=utf-8');
        res.status(200).send(`${user.name}'s schedule ${name} was updated`);
    }).catch(err => {
        res.status(404);            
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(`Schedule not found`);
    });
}

function deleteSchedule(req, res) {
    let email = req.params.email;
    let name = req.params.schedName;
    
    User.findOneAndUpdate({ email: `${email}` }, {
        $pull: {
            schedules: { name: `${name}`},
        }}, {safe:true, multi:false}
    ).then(user => {
        res.type('text/plain; charset=utf-8');
        res.status(200).send(`${user.name}'s schedule ${name} was deleted`);
    }).catch(err => {
        res.status(404);            
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(`Schedule not found`);
    });

}

function addGroupToSchedule(req, res) {
    let email = req.params.email;
    let name = req.params.schedName;
    let newGroup = req.body.code;

    User.findOneAndUpdate({ email: `${email}`, "schedules.name":`${name}`}, {
        $push: {
            "schedules.$.groups": newGroup
        }}
    ).then(user => {
        res.type('text/plain; charset=utf-8');
        res.status(200).send(`${user.name} has added ${newGroup} to schedule ${name}!`);
    }).catch(err => {
        res.status(404);            
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(`Schedule not found`);
    });
}

function addGroupToSchedule(req, res) {
    let email = req.params.email;
    let name = req.params.schedName;
    let newGroup = req.body.code;

    User.findOneAndUpdate({ email: `${email}`, "schedules.name":`${name}`}, {
        $push: {
            "schedules.$.groups": newGroup
        }}
    ).then(user => {
        res.type('text/plain; charset=utf-8');
        res.status(200).send(`${user.name} has added ${newGroup} to schedule ${name}!`);
    }).catch(err => {
        res.status(404);            
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(`Schedule not found`);
    });
}

function deleteGroupFromSchedule(req, res) {
    let email = req.params.email;
    let name = req.params.schedName;
    let group = req.params.groupCode;

    User.findOneAndUpdate({ email: `${email}`, "schedules.name":`${name}`}, {
        $pull: {
            "schedules.$.groups": group
        }}, {safe:true, multi:false}
    ).then(user => {
        res.type('text/plain; charset=utf-8');
        res.status(200).send(`${user.name} has deleted ${group} from schedule ${name}`);
    }).catch(err => {
        console.log(err);
        res.status(404);            
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(`Schedule not found`);
    });
}

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
exports.addGroupToSchedule = addGroupToSchedule;
exports.deleteGroupFromSchedule = deleteGroupFromSchedule;