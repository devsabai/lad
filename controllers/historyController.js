const models = require('../models/index');
const formidable = require('formidable');
const myFun = require('./function/myFunc');

exports.index = async (req, res, next) => {
    const { lang } = req.params
    const _model = models.history
    const _field = [`id`, [`topic_${lang}`, `topic`], [`content_${lang}`, `content`], [`image_${lang}`, `image`], `createdAt`]
    const _url = ""
    await myFun.getData(lang, _model, _field, _url, res)
}

exports.insert = async (req, res, next) => {
    const form = new formidable.IncomingForm()
    form.parse(req, async (error, fields, files) => {
        const data_1 = {
            no: fields.no,
            topic_la: fields.topic_la,
            content_la: fields.content_la,
            image_la: fields.image_la,
            topic_en: fields.topic_en,
            content_en: fields.content_en,
            image_en: fields.image_en
        }
        const result = await myFun.insertData(models.history, data_1)
        _path = "/history/"
        _image_la = await myFun.uploadFile(files.image_la, result.image_la, result.id, _path, "la");
        _image_en = await myFun.uploadFile(files.image_en, result.image_en, result.id, _path, "en");

        const data_2 = {
            image_la: _image_la,
            image_en: _image_en,
        }
        await myFun.updateData(models.history, result.id, data_2, res)
    })
}
exports.update = async (req, res, next) => {
    const { id } = req.params
    await myFun.checkId(models.history, id, res)
    const form = new formidable.IncomingForm()
    form.parse(req, async (error, fields, files) => {
        const data_1 = {
            no: fields.no,
            topic_la: fields.topic_la,
            content_la: fields.content_la,
            image_la: fields.image_la,
            topic_en: fields.topic_en,
            content_en: fields.content_en,
            image_en: fields.image_en
        }
        let result = await myFun.updateData(models.history, id, data_1, res)
        _path = "/history/"
        _image_la = await myFun.uploadFile(files.image_la, result.image_la, id, _path, "la");
        _image_en = await myFun.uploadFile(files.image_en, result.image_en, id, _path, "en");

        const data_2 = {
            image_la: _image_la,
            image_en: _image_en,
        }
        await myFun.updateData(models.history, id, data_2, res)
    })
}
exports.destroy = async (req, res, next) => {
    const { id } = req.params
    await myFun.checkId(models.history, id, res)
    const result = await myFun.findData(models.history, id)
    _path = "public/uploads/history/"
    await myFun.destroyFile(_path, result.image_la)
    await myFun.destroyFile(_path, result.image_en)
    await myFun.destroyData(models.history, id, res)
}










