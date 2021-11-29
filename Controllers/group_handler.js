"use strict";

const Group = require('../Models/group')

function getGroups(req, res) {
    Group.find({}).then(groups => res.status(200).json(groups));
}

function getGroupByCode(req, res) {
    let code = req.params.code;
    Group.findOne({ code: `${code}` }).then(group => res.status(200).json(group));
}

function createGroup(req, res) {
    let group = Group(req.body);

    group.save().then((group) => {
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(`Group ${group.code} was created!`);
    });
}

function updateGroup(req, res) {
    let code = req.params.code;
    let updatedGroup = req.body;

    for (let property in updatedGroup) {
        if (['code', 'subject', 'classroom', 'professor', 'language', 'days', 'hours'].includes(property)) continue;
        delete updatedGroup[property];
    }

    Group.findOneAndUpdate({ code: `${code}` }, updatedGroup, {new:true}).then(group => {
        res.type('text/plain; charset=utf-8');
        res.send(`Group ${group.code} was updated!`);
    });
}

function deleteGroup(req, res) {
    let code = req.params.code;

    Group.findOneAndDelete({ code: `${code}` }).then(group => {
        res.type('text/plain; charset=utf-8');
        res.send(group != undefined ? `Group ${group.code} was deleted!` : `No group with code ${code} was found!`);
    });
}

exports.getGroups = getGroups;
exports.getGroupByCode = getGroupByCode;
exports.createGroup = createGroup;
exports.updateGroup = updateGroup;
exports.deleteGroup = deleteGroup;