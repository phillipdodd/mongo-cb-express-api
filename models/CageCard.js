const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose.model(
    'CageCard',
    new Schema({
        portalID: String
    })
);