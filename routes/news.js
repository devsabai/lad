const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController')

router.get('/:lang', newsController.index);
router.get('/:lang/publish', newsController.getPublish);
router.post('/', newsController.insert);
router.put('/:id', newsController.update);
router.put('/:status/:id', newsController.publish);
router.delete('/:id', newsController.destroy);

module.exports = router