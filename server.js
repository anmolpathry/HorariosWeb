"use strict";


const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors({origin: ['http://127.0.0.1:8080']}));
app.use(express.json()); 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

