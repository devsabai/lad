const models = require('../models/index');
const formidable = require('formidable');
const myFun = require('./function/myFunc');

const _model = models.news
const _url = ""
const _orderBy = [['id', 'desc']]

exports.index = async (req, res, next) => {

    const { lang } = req.params
    const _field = [`id`, [`topic_${lang}`, `topic`], [`content_${lang}`, `content`], `cover`, `image`, `createdAt`]
    await myFun.getDataLang(_model, _field, _url, res, lang, _orderBy)

}

exports.getPublish = async (req, res, next) => {

    const { lang } = req.params
    const _field = [`id`, [`topic_${lang}`, `topic`], [`content_${lang}`, `content`], `cover`, `image`, `createdAt`]
    const _where = { status : 1}
    await myFun.getDataLang(_model, _field, _url, res, lang, _orderBy, _where)

}

exports.getAllData = async (req, res, next) => {

    const _field = [`id`, `topic_la`, `content_la`, `topic_en`, `content_en`, `cover`, `image`, `status`, `createdAt`]
    await myFun.getDataLang(_model, _field, _url, res, 'all', _orderBy)

}

exports.getOneData = async (req, res, next) => {

    const { id } = req.params
    const _field = [`id`, `topic_la`, `content_la`, `topic_en`, `content_en`, `cover`, `image`, `status`, `createdAt`]
    const _where = { id: id }
    await myFun.getDataLang(_model, _field, _url, res, 'all', _orderBy, _where)

}

exports.show = async (req, res, next) => {

    const { id, lang } = req.params
    const _field = [`id`, [`topic_${lang}`, `topic`], [`content_${lang}`, `content`], `cover`, `image`, `createdAt`]
    const _where = { id : id }
    await myFun.getDataLang(_model, _field, _url, res, lang, _orderBy, _where)  

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
        const result = await myFun.insertData(_model, data_1)
        _path = "/news/"
        _cover = await myFun.uploadFile(files.cover, result.cover, result.id, _path, "cover");
        _image = await myFun.uploadFile(files.image, result.image, result.id, _path, "news");

        const data_2 = {
            cover: _cover,
            image: _image,
        }
        await myFun.updateData(_model, result.id, data_2, res)
    })
}

exports.update = async (req, res, next) => {

    const { id } = req.params
    await myFun.checkId(_model, id, res)
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
        const result = await myFun.updateData(_model, id, data_1)
        _path = "/news/"
        _cover = await myFun.uploadFile(files.cover, result.cover, id, _path, "cover");
        _image = await myFun.uploadFile(files.image, result.image, id, _path, "news");

        const data_2 = {
            cover: _cover,
            image: _image,
        }
        await myFun.updateData(_model, id, data_2, res, 'return')
    })
}

exports.destroy = async (req, res, next) => {

    const { id } = req.params
    const result = await myFun.checkId(_model, id, res)
    _path = "public/uploads/news/"
    await myFun.destroyFile(_path, result.cover)
    await myFun.destroyFile(_path, result.image)
    await myFun.destroyData(_model, id, res, 'return')

}

exports.publish = async (req, res, next) => {
    const { id, status } = req.params
    const dataPublish = { status: 1 }
    const dataUnPublish = { status: 0 }
    await myFun.checkId(_model, id, res)
    await myFun.publish(_model, status, id, dataPublish, dataUnPublish, res)

}