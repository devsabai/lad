const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController')

router.get('/all/data', newsController.getAllData);
router.get('/all/data/:id', newsController.getOneData);
router.get('/:lang', newsController.index);
router.get('/:lang/:id', newsController.show);
router.get('/data/publish/:lang', newsController.getPublish);
router.post('/', newsController.insert);
router.put('/:id', newsController.update);
router.put('/:status/:id', newsController.publish);
router.delete('/:id', newsController.destroy);

module.exports = router