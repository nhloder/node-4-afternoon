const swag = require('../models/swag.js');

module.exports = {
    search: (req,res) => {
        const { category } = req.query;

        if (!category) {
            res.status(200).send(swag)
        } else {
            const filteredSwag = swag.filter(swag => swag.category === category);
            res.status(200).send(filteredSwag);
        }
    }
}