const express = require('express');
const router = express.Router();
const { contactForm } = require("../controllers/contact-controller"); // Correctly import the contactForm function

router.post("/contact", contactForm);

module.exports = router;
