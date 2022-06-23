const express = require('express');
const User = require('./model');
const generateTocken = require('./service');
const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string(),
});


async function postCont(req, res, next) {
    try {
        const user = new User({
            login: req.query.login,
            password: req.query.password,
            tocken: "",
        });
        schema.validate({ user });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        next(error);
    }
};

async function getAll(req, res, next) {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
};

async function signIn(req, res, next) {
    try {
        const tocken = generateTocken();
        const user = await User.findOne({ login: req.query.login, password: req.query.password });
        if (user) {
            user.tocken = tocken;
            await user.save();
            return res.status(201).send(user.tocken);
        }
        res.status(401).send("Login failed");
    } catch (error) {
        next(error);
    }
};

async function patch(req, res, next) {
    try {
        const user = await User.findOne({ login: req.query.login });
        if (!user) {
            res.status(404).send("User not found");
        }
        else {
            user.password = req.query.password;
            await user.save();
            res.status(202).send(user);
        }
    } catch (error) {
        next(error);
    }
};

async function deleteUser(req,res,next){
    try{
        const user = await User.findOne({login:req.query.login});
    if (!user){
        res.status(404).send("User not found");
    }
    else{
        if(user.password === req.query.password){
            user.login = null;
            user.password = null;
            user.tocken = null;
            res.status(200).send(user);
        }
        else{
            res.status(403).send("Enter another password");
        }
    }
    }catch (error) {
        next(error);
    }
}


module.exports = { postCont, getAll, signIn , patch, deleteUser};