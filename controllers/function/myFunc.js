const path = require('path');
const fs = require('fs-extra');


exports.getDataLang = async (model, _field, _url, res, lang, _orderBy, _where) => {
    if (lang == 'all') {
        const result = await model.findAll({
            attributes: _field,
            logging: false,
            where: _where,
            order: _orderBy
        })
        return res.status(200).json({
            url: _url,
            data: result
        })
    } else if (lang == 'la') {

        const result = await model.findAll({
            attributes: _field,
            logging: false,
            where: _where,
            order: _orderBy
        })
        // console.log(result)
        return res.status(200).json({
            url: _url,
            data: result
        })
    } else if (lang == 'en') {
        const result = await model.findAll({
            attributes: _field,
            logging: false,
            where: _where,
            order: _orderBy
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
        return res.status(200).json({ message: "insert ຄໍາຂໍສໍາເລັດ" })
    }
    return result
}
exports.updateData = async (model, id, obj_data, res, _return) => {
    result = await model.update(obj_data, { where: { id: id }, logging: false });
    if (_return == 'return') {
        return res.status(200).json({ message: "ຄໍາຂໍສໍາເລັດ" })
    }
    return result
}
exports.destroyData = async (model, id, res, _return) => {
    await model.destroy({ where: { id: id }, logging: false });
    if (_return == 'return') {
        return res.status(200).json({ message: "ຄໍາຂໍສໍາເລັດ", });
    }
}
exports.checkId = async (model, id, res) => {
    const result = await model.findByPk(id, { logging: false });

    if (!result) {
        return res.status(404).json({ message: "ບໍ່ມີຂໍ້ມູນ" })
    }
    return result
}

exports.uploadFile = async (files, doc, doc_id, path_, lang) => {
    if (files.size != 0) {
        let fileExtension = files.type.split("/")[1];
        doc = `${doc_id}_${lang}.${fileExtension}`;
        let newPath = path.resolve("public/uploads") + path_ + "/" + doc;
        if (fs.existsSync(newPath)) {
            await fs.remove(newPath)
        }
        await fs.moveSync(files.path, newPath)
        return doc;
    }
    return null
}
exports.destroyFile = async (path, img) => {
    let result = await fs.remove(path + img)
    return result
}
exports.publish = async (model, status, id, dataPublish, dataUnPublish, res) => {

    if (status == 'publish') {
        result = await model.update(dataPublish, { where: { id: id }, logging: false });
        return res.status(200).json({ message: "ຄໍາຂໍສໍາເລັດ" })

    } else if (status == 'unpublish') {
        result = await model.update(dataUnPublish, { where: { id: id }, logging: false });
        return res.status(200).json({ message: "ຄໍາຂໍສໍາເລັດ" })
    }
    return res.status(404).json({ message: "url ບໍ່ຖືກຕ້ອງ" })
}
