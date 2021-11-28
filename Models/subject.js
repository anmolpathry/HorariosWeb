"use strict";
const mongoose = require('mongoose');
mongoose.connect(mongoDB, { useNewUrlParser: true });

let subjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
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