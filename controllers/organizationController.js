const models = require('../models/index');
const formidable = require('formidable');
const myFun = require('./function/myFunc');

const _model = models.organization
const _url = ""
const _orderBy = [['id', 'desc']]

// client 

exports.index = async (req, res, next) => {
    const { lang } = req.params
    const _field = [`id`, [`content_${lang}`, `content`], [`image_${lang}`, `image`], `createdAt`]
    await myFun.getDataLang(_model, _field, _url, res, lang, _orderBy)
}
exports.show = async (req, res, next) => {
    const { id, lang } = req.params
    const _field = [`id`, [`content_${lang}`, `content`], [`image_${lang}`, `image`], `createdAt`]
    const _where = { id : id }
    await myFun.getDataLang(_model, _field, _url, res, lang, _orderBy, _where)   
}

// client

// admin

exports.getAllData = async (req, res, next) => {

    const _field = [`id`, `content_la`, `image_la`, `content_en`, `image_en`, `createdAt`]
    await myFun.getDataLang(_model, _field, _url, res, 'all', _orderBy)
}
exports.getOneData = async (req, res, next) => {
    const { id } = req.params
    const _field = [`id`, `content_la`, `image_la`, `content_en`, `image_en`, `createdAt`]
    const _where = { id : id }
    await myFun.getDataLang(_model, _field, _url, res, 'all', _orderBy, _where)
}

exports.insert = async(req, res, next) => {
    const form = formidable.IncomingForm();
    form.parse(req, async(error, fields, files) => {
        const data_1 = {
            no: fields.no,
            content_la: fields.content_la,
            image_la: fields.image_la,
            content_en: fields.content_en,
            image_en: fields.image_en,
        }
        const result = await myFun.insertData(models.organization, data_1)
        _path = "/organization/"
        _image_la = await myFun.uploadFile(files.image_la, result.image_la, result.id, _path, 'la')
        _image_en = await myFun.uploadFile(files.image_en, result.image_en, result.id, _path, 'en')

        const data_2 = {
            image_la: _image_la,
            image_en: _image_en,
        }
        await myFun.updateData(models.organization, result.id, data_2, res, 'return')
    })
}
exports.update = async(req, res, next) => {
    const { id } = req.params
    await myFun.checkId(models.organization, id, res)
    const form = formidable.IncomingForm();
    form.parse(req, async(error, fields, files) => {
        const data_1 = {
            no: fields.no,
            content_la: fields.content_la,
            image_la: fields.image_la,
            content_en: fields.content_en,
            image_en: fields.image_en,
        }
        const result = await myFun.updateData(models.organization, id, data_1)
        _path = "/organization/"
        _image_la = await myFun.uploadFile(files.image_la, result.image_la, id, _path, 'la')
        _image_en = await myFun.uploadFile(files.image_en, result.image_en, id, _path, 'en')

        const data_2 = {
            image_la: _image_la,
            image_en: _image_en,
        }
        await myFun.updateData(models.organization, id, data_2, res, 'return')
    })
}
exports.destroy = async (req, res, next) => {
    const { id } = req.params
    const result = await myFun.checkId(models.organization, id, res)
    _path = "public/uploads/organization/"
    await myFun.destroyFile(_path, result.image_la)
    await myFun.destroyFile(_path, result.image_en)
    await myFun.destroyData(models.organization, id, res, 'return')
}

// admin