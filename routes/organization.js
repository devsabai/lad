const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController')

router.get('/:lang', organizationController.index);
router.post('/', organizationController.insert);
router.put('/:id', organizationController.update);
router.delete('/:id', organizationController.destroy);

module.exports = router;


