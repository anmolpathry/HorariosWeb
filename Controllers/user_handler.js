"use strict";

const User = require('../Models/user')

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
        if (['name', 'password'].includes(property)) continue;
        delete updatedUser[property];
    }

    User.findOneAndUpdate({ email: `${email}` }, updatedUser, {new:true}).then(user => {
        res.type('text/plain; charset=utf-8');
        res.send(`User ${user.name} was updated!`);
    });
}

exports.getUsers = getUsers;
exports.getUserByEmail = getUserByEmail;
exports.createUser = createUser;
exports.updateUser = updateUser;