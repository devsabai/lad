const models = require('../models/index');
const formidable = require('formidable');
const myFun = require('./function/myFunc');

exports.index = async (req, res, next) => {
    const { lang } = req.params
    const _model = models.news
    const _field = [`id`, [`topic_${lang}`, `topic`], [`content_${lang}`, `content`], `cover`, `image`, `createdAt`]
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
            topic_en: fields.topic_en,
            content_en: fields.content_en,
            cover: fields.cover,
            image: fields.image,
            status: 0
        }
        const result = await myFun.insertData(models.news, data_1)
        _path = "/news/"
        _cover = await myFun.uploadFile(files.cover, result.cover, result.id, _path, "cover");
        _image = await myFun.uploadFile(files.image, result.image, result.id, _path, "news");

        const data_2 = {
            cover: _cover,
            image: _image,
        }
        await myFun.updateData(models.news, result.id, data_2, res)
    })
}
exports.update = async (req, res, next) => {
    const { id } = req.params
    await myFun.checkId(models.news, id, res)
    const form = new formidable.IncomingForm()
    form.parse(req, async (error, fields, files) => {
        const data_1 = {
            no: fields.no,
            topic_la: fields.topic_la,
            content_la: fields.content_la,
            topic_en: fields.topic_en,
            content_en: fields.content_en,
            cover: fields.cover,
            image: fields.image,
            status: fields.status
        }
        const result = await myFun.updateData(models.news, id, data_1)
        _path = "/news/"
        _cover = await myFun.uploadFile(files.cover, result.cover, id, _path, "cover");
        _image = await myFun.uploadFile(files.image, result.image, id, _path, "news");

        const data_2 = {
            cover: _cover,
            image: _image,
        }
        await myFun.updateData(models.news, id, data_2, res)
    })
}
exports.destroy = async (req, res, next) => {
    const { id } = req.params
    await myFun.checkId(models.news, id, res)
    const result = await myFun.findData(models.news, id)
    _path = "public/uploads/news/"
    await myFun.destroyFile(_path, result.cover)
    await myFun.destroyFile(_path, result.image)
    await myFun.destroyData(models.news, id, res)
}
exports.getPublish = async (req, res, next) => {
    const { lang } = req.params
    const _model = models.news
    const _field = [`id`, [`topic_${lang}`, `topic`], [`content_${lang}`, `content`], `cover`, `image`, `createdAt`]
    const _where = { status: 1 }
    const _url = ""
    await myFun.getData(lang, _model, _field, _url, res, _where)
}
exports.publish = async (req, res, next) => {
    const { id, status } = req.params
    const dataPublish = { status: 1 }
    const dataUnPublish = { status: 0 }
    await myFun.checkId(models.news, id, res)
    await myFun.checkPublish(models.news, status, id, dataPublish, dataUnPublish, res)
}