"use strict";
const mongoose = require('mongoose');
const classSchema = require("./Class");
mongoose.connect(mongoDB, { useNewUrlParser: true });

let scheduleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    classes: {
        type: [classSchema],
        required: true
    },
    period: {
        type: String,
        required: true
    } 
});

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        required: true
    },
    schedules: {
        type: [scheduleSchema],
        required: false
    },
});

let User = mongoose.model('user', userSchema);
let Schedule = mongoose.model('schedule', scheduleSchema);

exports.User = User;
exports.Schedule = Schedule;