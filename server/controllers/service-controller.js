const Service = require('../models/service-model');

const services = async (req, res) => {
    try {
        const response = await Service.find();
        if (!response || response.length === 0) {
            return res.status(404).json({ msg: 'No service found' });
        }
        res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`Services Error: ${error}`);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

module.exports = services;

