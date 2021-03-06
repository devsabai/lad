const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController')


// client 
router.get('/:lang', historyController.index);
router.get('/:lang/:id', historyController.show);

// admin
router.get('/all/data', historyController.getAllData);
router.get('/all/data/:id', historyController.getOneData);
router.post('/', historyController.insert);
router.put('/:id', historyController.update);
router.delete('/:id', historyController.destroy);

module.exports = router;