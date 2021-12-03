"use strict";

const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
    let token = req.get("x-auth");
    if (token == undefined) {
        return res.status(403).send("Missing token");
    }

    jwt.verify(token, privateKey, (err, decoded) => {
        if (err) return res.status(401).send("Invalid Token");

        req.userInfo = decoded;
        return next();
    });
};

const validateUser =  (req, res, next) => {
    let token = req.get("x-auth");
    if (token == undefined) {
        return res.status(403).send("Missing token");
    }
    jwt.verify(token, TOKEN_KEY, (err, decoded) => {
        if (err) return res.status(401).send("Invalid Token");
        req.userInfo = decoded;
        if (userInfo.role == 'USER') return next();
        //window.location.href = '../Views/admin_classes.html';
    });
};
//userInfo = {email: userInfo.email, role: userInfo.role};
//User.find({emai: userInfo.email})
const validateAdmin =  (req, res, next) => {
    let token = req.get("x-auth");
    if (token == undefined) {
        return res.status(403).send("Missing token");
    }

    jwt.verify(token, TOKEN_KEY, (err, decoded) => {
        if (err) return res.status(401).send("Invalid Token");
        req.userInfo = decoded;
        if (userInfo.role == 'ADMIN') return next();
        //window.location.href = '../Views/home.html';
    });
};

exports.validateUser = validateUser;
exports.validateAdmin = validateAdmin;
exports.verifyToken = verifyToken;