const models = require('../../models/index');
const path = require('path');
const fs = require('fs-extra');

exports.uploadFile = async (files, doc, doc_id, path_, lang) => {
    if (files != null) {
        var fileExtension = files.name.split(".")[1];
        doc = `${doc_id}_${lang}.${fileExtension}`;
        var newPath = path.resolve("public/uploads") + path_ + "/" + doc;
        if (fs.exists(newPath)) {
            await fs.remove(newPath)
        }
        await fs.moveSync(files.path, newPath)
        return doc;
    }
}
exports.deleteFile = async (path, img) => {
    let result = await fs.remove(path + img)
    return result
}