const mongoose = require('mongoose');
module.exports = mongoose.model(
    'CageCard',
    new mongoose.Schema({
        portalID: String
    })
)