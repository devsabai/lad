const path = require('path');
const fs = require('fs-extra');

exports.getData = async (lang, model, _field, _url, res) => {
    if (lang == 'la') {
        const result = await model.findAll({
            attributes: _field,
            logging: false
        })
        return res.status(200).json({
            url: _url,
            data: result
        })
    } else if (lang == 'en') {
        const result = await model.findAll({
            attributes: _field,
            logging: false
        })
        return res.status(200).json({
            url: _url,
            data: result
        })
    }
    return res.status(404).json({ message: "url ບໍ່ຖືກຕ້ອງ" })
}
exports.insertData = async (model, obj_data, res) => {
    result = await model.create(obj_data, { logging: false });
    if (res) {
        return res.status(200).json({ message: "success" })
    }
    return result
}
exports.updateData = async (model, id, obj_data, res) => {
    result = await model.update(obj_data, { where: { id: id }, logging: false });
    if (res) {
        return res.status(200).json({ message: "success" })
    }
    return result
}
exports.destroyData = async (model, id, res) => {
    await model.destroy({ where: { id: id }, logging: false });
    if (res) {
        return res.status(200).json({ message: "success", });
    }
}
exports.checkId = async (model, id, res, next) => {
    const _history = await model.findByPk(id, { logging: false });
    if (!_history) {
        return res.status(404).json({ message: "ບໍ່ມີຂໍ້ມູນ" })
    }
}
exports.findData = async (model, id) => {
    let result = await model.findOne({ where: { id }, logging: false })
    return result
}

exports.uploadFile = async (files, doc, doc_id, path_, lang) => {
    if (files != null) {
        let fileExtension = files.type.split("/")[1];
        doc = `${doc_id}_${lang}.${fileExtension}`;
        let newPath = path.resolve("public/uploads") + path_ + "/" + doc;
        if (fs.exists(newPath)) {
            await fs.remove(newPath)
        }
        await fs.moveSync(files.path, newPath)
        return doc;
    }
}
exports.destroyFile = async (path, img) => {
    let result = await fs.remove(path + img)
    return result
}
