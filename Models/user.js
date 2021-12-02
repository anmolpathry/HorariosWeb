"use strict";
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let mongoDB = process.env.MONGO_DB;

let privateKey = process.env.TOKEN_KEY;

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

userSchema.pre('save', function(next) {
    let user = this;
    user.password = bcrypt.hashSync(user.password, 10);
    next();
})

userSchema.methods.generateToken = function(password) {
    let user = this;
    let payload = {email: user.email, role: user.role};
    let options = { expiresIn: 60 * 60 }
    if (bcrypt.compareSync(password, user.password)) {
        try {
            user.token = jwt.sign(payload, privateKey, options);
            return user.token;
        } catch (err) {
            console.log(err);
        }
    }
}

const User = mongoose.model('user', userSchema);
const Schedule = mongoose.model('schedule', scheduleSchema);

//module.exports={User:User, Schedule: Schedule}
exports.User = User;
exports.Schedule = Schedule;