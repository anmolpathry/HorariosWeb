"use strict";

const Subject = require('../Models/subject')

function getSubjects(req, res) {
    Subject.find({}).then(subjects => res.status(200).json(subjects));
}

function getSubjectByName(req, res) {
    let name = req.params.name;
    console.log(name);
    Subject.findOne({ name: `${name}` }).then(subject => res.status(200).json(subject));
}

function createSubject(req, res) {
    let subject = Subject(req.body);

    subject.save().then((subject) => {
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(`Subject ${subject.name} was created!`);
    });
}

function updateSubject(req, res) {
    let name = req.params.name;
    let updatedSubject = req.body;

    for (let property in updatedSubject) {
        if (['name', 'department', 'credits'].includes(property)) continue;
        delete updatedSubject[property];
    }

    Subject.findOneAndUpdate({ name: `${name}` }, updatedSubject, {new:true}).then(subject => {
        res.type('text/plain; charset=utf-8');
        res.send(`Subject ${subject.name} was updated!`);
    });
}

function deleteSubject(req, res) {
    let name = req.params.name;

    Subject.findOneAndDelete({ name: `${name}` }).then(subject => {
        res.type('text/plain; charset=utf-8');
        res.send(subject != undefined ? `Subject ${subject.name} was deleted!` : `No subject with name ${name} was found!`);
    });
}

exports.getSubjects = getSubjects;
exports.getSubjectByName = getSubjectByName;
exports.createSubject = createSubject;
exports.updateSubject = updateSubject;
exports.deleteSubject = deleteSubject;