"use strict";
const mongoose = require('mongoose');
mongoose.connect(mongoDB, { useNewUrlParser: true });

let classSchema = mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    classroom: {
        type: String,
        required: true
    },
    professor: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    days: {
        type: [String],
        enum: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        required: true
    },
    hours: {
        type: String,
        enum: ['7-9', '9-11', '11-13', '13-15', '16-18', '18-20', '20-22'],
        required: true
    },
});

let Class = mongoose.model('class', classSchema);

module.exports = Class;