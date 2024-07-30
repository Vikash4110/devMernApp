const express = require('express');
const router = express.Router();
const services = require('../controllers/service-controller');

router.get('/service', services); // This should handle GET requests to /service

module.exports = router;
