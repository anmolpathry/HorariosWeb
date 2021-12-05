"use strict";

const Group = require('../Models/group')

function getGroups(req, res) {
    if (Object.keys(req.query).length === 0)
        Group.find({}).sort('subject').then(groups => res.status(200).json(groups));
    else{
        const {subject, professor, language, days, hours, sortBy} = req.query;
        let sortQ = 'subject';
        let query = {};
        if(sortBy) sortQ = sortBy;
        if(subject) query.subject = subject;
        if(professor) query.professor = professor;
        if(language) query.language = language;
        if(days) query.days = { $all: days };
        if(hours){
            /*let minHour = parseInt(hours[0].split("-")[0]);
            let minHour = parseInt(hours[0].split("-")[0]);
            query.hours = { $gte: hours[0], $lte: hours[1] };*/
        } 
        Group.find(query).sort(sortQ).then(groups => res.status(200).json(groups));
    }
}

function getGroupByCode(req, res) {
    let code = req.params.code;
    Group.findOne({ code: `${code}` }).then(group => res.status(200).json(group));
}

function getGroupById(req, res) {
    let id = req.params.id;
    Group.findById(id).then(group => res.status(200).json(group));
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
exports.getGroupById = getGroupById;