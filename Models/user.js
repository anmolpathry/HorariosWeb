"use strict";
const mongoose = require('mongoose');
let mongoDB = process.env.MONGO_DB;
mongoose.connect(mongoDB, { useNewUrlParser: true });

let scheduleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    groups: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'group'}],
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