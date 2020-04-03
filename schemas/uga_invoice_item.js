const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = new Schema({
        "dateCreated": Date,
        "dateModified": Date,
        "ID": String,
        "metaCloneId": String,
        "customAttributes.uga_account": String,
        "customAttributes.uga_associatedExports_set": [String],
        "customAttributes.uga_associatedOrderLineItem_set": [String],
        "customAttributes.uga_cageCard_historyItem_set": [String],
        "customAttributes.uga_cageCard_set": [String],
        "customAttributes.uga_charge_date": Date,
        "customAttributes.uga_chargeType": String,
        "customAttributes.uga_chartString_perDiem": String,
        "customAttributes.uga_chartString_procurement": String,
        "customAttributes.uga_chartString_serviceRequest": String,
        "customAttributes.uga_description": String,
        "customAttributes.uga_facility": String,
        "customAttributes.uga_isOtherCharge": Boolean,
        "customAttributes.uga_paymentMethod": String,
        "customAttributes.uga_perDiem": String,
        "customAttributes.uga_profileSelection_perDiem": String,
        "customAttributes.uga_profileSelection_procurement": String,
        "customAttributes.uga_profileSelection_serviceRequest": String,
        "customAttributes.uga_protocol": String,
        "customAttributes.uga_quantity": Number,
        "customAttributes.uga_removedFromSet": Boolean,
        "customAttributes.uga_servicesActivityItem_set": [String],
        "customAttributes.uga_species": String,
        "customAttributes.uga_total": Number,
        "customAttributes.uga_unit_cost": Number
    });