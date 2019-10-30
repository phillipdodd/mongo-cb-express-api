const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose.model(
    'uga_cageCard_history',
    new Schema({
        "oid": String,
        "customAttributes.activityType": String,
        "customAttributes.cageCard": String,
        "dateCreated": Date,
        "dateModified": Date,
        "customAttributes.dateTimeIn": Date,
        "customAttributes.dateTimeOut": Date,
        "customAttributes.facility": String,
        "ID": String,
        "metaCloneId": String,
        "customAttributes.account": String,
        "customAttributes.perDiem": String,
        "customAttributes.projectState": String,
        "customAttributes.protocol": String,
        "customAttributes.uga_activitySheet_reference": String,
        "customAttributes.uga_care_day_count": Number,
        "customAttributes.uga_chain_dateLastValidated": Date,
        "customAttributes.uga_chain_deleted": Boolean,
        "customAttributes.uga_chain_index": Number,
        "customAttributes.uga_chain_next": String,
        "customAttributes.uga_chain_previous": String,
        "customAttributes.uga_paymentMethod": String,
        "customAttributes.uga_perDiem_chartString": String,
        "customAttributes.user": String
    })
);