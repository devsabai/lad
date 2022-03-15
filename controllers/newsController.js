const models = require('../models/index');
const formidable = require('formidable');
const myFun = require('./function/myFunc');

exports.index = async (req, res, next) => {
    return res.status(200).json({ message: "success"})
}