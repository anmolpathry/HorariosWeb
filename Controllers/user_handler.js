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

    //console.log(email);
    //console.log(updatedUser);

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
    let email = req.body.email;
    let password = req.body.password;
    
    User.findOne({ email: `${email}` })
        .then(user => {
            let token = user.generateToken(password);
            console.log(token)
            if (token != undefined) {
                res.status(200)
                res.set('Content-Type', 'text/plain; charset=utf-8');
                res.send(token);
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

exports.getUsers = getUsers;
exports.getUserByEmail = getUserByEmail;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.login = login;
