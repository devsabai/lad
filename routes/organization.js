const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController')

router.post('/', organizationController.insert);

module.exports = router;


