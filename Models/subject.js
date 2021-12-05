"use strict";
const mongoose = require('mongoose');
let mongoDB = process.env.MONGO_DB;
mongoose.connect(mongoDB, { useNewUrlParser: true });

let subjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    department: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
});

let Subject = mongoose.model('subject', subjectSchema);

module.exports = Subject;