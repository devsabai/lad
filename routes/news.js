const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController')

router.get('/:lang', newsController.index);
router.post('/', newsController.insert);
router.put('/:id', newsController.update);
router.delete('/:id', newsController.destroy);

module.exports = router