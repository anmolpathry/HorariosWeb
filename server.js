"use strict";
require('dotenv').config({path: 'env'});

const express = require('express');
const cors = require('cors');
const router = require("./Controllers/router");
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json()); 
app.use(router);

console.log(__dirname);
app.use(express.static(__dirname + '/AJAX'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
