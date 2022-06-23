const { default: helmet } = require('helmet');

const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      compression = require('compression');



async function BodyParser(){
console.log(app.use(bodyParser.json()));
bodyParser.urlencoded({ extended: true });
}

async function CookieParser(){
    console.log(app.use(cookieParser.json()));
}

async function Compression(){
    app.use(compression());
}

async function Helmet(){
    app.use(helmet());
}

async function Cors(){
    app.use(Cors());
}

module.exports = {BodyParser , CookieParser , Compression, Helmet, Cors}