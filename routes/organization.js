const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController')

// client
router.get('/:lang', organizationController.index);
router.get('/:lang/:id', organizationController.show);

// admin
router.get('/all/data', organizationController.getAllData);
router.get('/all/data/:id', organizationController.getOneData);
router.post('/', organizationController.insert);
router.put('/:id', organizationController.update);
router.delete('/:id', organizationController.destroy);

module.exports = router;


