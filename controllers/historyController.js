const models = require('../models/index');
const formidable = require('formidable');
const upload = require('./function/myFunc');
const fs = require('fs-extra');

exports.index = async (req, res, next) => {
    return res.status(200).json({ message: "success" })
}

exports.insert = async (req, res, next) => {
    const form = new formidable.IncomingForm()
    form.parse(req, async (error, fields, files) => {
        let result = await models.history.create({
            no: fields.no,
            topic_la: fields.topic_la,
            content_la: fields.content_la,
            image_la: fields.image_la,
            topic_en: fields.topic_en,
            content_en: fields.content_en,
            image_en: fields.image_en
        }, { logging: false })
        _path = "/history/"
        _image_la = await upload.uploadFile(files.image_la, result.image_la, result.id, _path, "la");
        _image_en = await upload.uploadFile(files.image_en, result.image_en, result.id, _path, "en");

        await models.history.update({
            image_la: _image_la,
            image_en: _image_en,
        }, { where: { id: result.id }, logging: false });

        return res.status(200).json({ message: "success" })
    })
}
exports.update = async (req, res, next) => {
    const { id } = req.params
    const history = await models.history.findByPk(id);
    if (!history) {
        return res.status(404).json({ message: "ບໍ່ມີຂໍ້ມູນ" })
    }
    const form = new formidable.IncomingForm()
    form.parse(req, async (error, fields, files) => {
        let result = await models.history.update({
            no: fields.no,
            topic_la: fields.topic_la,
            content_la: fields.content_la,
            image_la: fields.image_la,
            topic_en: fields.topic_en,
            content_en: fields.content_en,
            image_en: fields.image_en
        }, { where: { id: id }, logging: false })
        _path = "/history/"
        _image_la = await upload.uploadFile(files.image_la, result.image_la, id, _path, "la");
        _image_en = await upload.uploadFile(files.image_en, result.image_en, id, _path, "en");

        await models.history.update({
            image_la: _image_la,
            image_en: _image_en,
        }, { where: { id: id }, logging: false });

        return res.status(200).json({ message: "success" })
    })
}
exports.destroy = async (req, res, next) => {
    const { id } = req.params
    const _history = await models.history.findByPk(id);
    if (!_history) {
        return res.status(404).json({ message: "ບໍ່ມີຂໍ້ມູນ" })
    }
    let result = await models.history.findOne({where: {id}})
    _path = "public/uploads/history/"
    upload.deleteFile(_path, result.image_la)
    upload.deleteFile(_path, result.image_en)
    await models.history.destroy({ where: { id: id }, logging: false });
    return res.status(200).json({
        message: "delete success",
    });
}










