const express = require('express');
const router = express.Router();
const services = require('../controllers/service-controller');

router.get('/service', services); 
module.exports = router;
