"use strict";
const mongoose = require('mongoose');
let mongoDB = process.env.MONGO_DB;
mongoose.connect(mongoDB, { useNewUrlParser: true });

let groupSchema = mongoose.Schema({
    code: {
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

const Group = mongoose.model('group', groupSchema);
module.exports = Group;