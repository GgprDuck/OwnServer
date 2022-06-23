const express = require('express');
const mongooseConnect = require('../config/connection');
const router = require('../config/router.js');
const app = express();


app.use("/v1/user", router);

mongooseConnect();

