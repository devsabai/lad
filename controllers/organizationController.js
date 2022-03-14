const models = require('../models/index');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs-extra');

exports.index = async (req, res, next) => {
    return res.status(200).json({
        message: "success"
    })
}
// uploadFile = async (files, doc) => {
//     if (files.file != null) {
//         var fileExtension = files.file.name.split(".")[1];
//         doc.file = `${doc.id}.${fileExtension}`;
//         var newPath = path.resolve("public/uploads/") + "/" + doc.file;
//         console.log(newPath);

//         if (fs.exists(newPath)) {
//             await fs.remove(newPath)
//         }
//         await fs.moveSync(files.file.path, newPath)

//         // Update database
//         let result = models.History.update(
//             { image: doc.file },
//             { where: { id: doc.id } }
//         );
//         return result;
//     }
// }
exports.insert = async (req, res, next) => {


    return res.status(200).json({
        message: "success"
    })

}