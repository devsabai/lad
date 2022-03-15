const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController')

router.get('/:lang', historyController.index);
router.post('/', historyController.insert);
router.put('/:id', historyController.update);
router.delete('/:id', historyController.destroy);

module.exports = router;