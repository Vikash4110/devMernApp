const Contact = require("../models/contact-model"); // Correctly import the Contact model

const contactForm = async (req, res) => {
    try {
        const { username, email, message } = req.body;
        await Contact.create({ username, email, message });
        return res.status(200).json({ msg: "Message sent successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Message not delivered" });
    }
};

module.exports = { contactForm };
