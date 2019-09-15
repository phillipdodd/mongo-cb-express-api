require('dotenv').config();
const http = require('http');
const logger = require('./lib/myWinston')('server.js');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//? used for testing
const axios = require('axios');

//* Apply Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//* Apply Routes
require('./api/routes/mongoRoutes')(app);

const serverPort = process.env.SSL_PORT || 4000;
// var sslOptions = {
//     pfx: fs.readFileSync(process.env.SSL_PFX),
//     passphrase: process.env.SSL_PASS
// }

const dbURL = process.env.MONGO_URL || "localhost";
const dbPort = process.env.MONGO_PORT || "27017";
const dbName = process.env.MONGO_DBNAME || 'my_database';

mongoose
    .connect(`mongodb://${dbURL}:${dbPort}/${dbName}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(r => {
        logger.info(`Connected to db`);
        http.createServer(app).listen(serverPort);
        logger.info(`App listening on port ${serverPort}`);
        
        testCalls();
    })
    .catch(err => logger.error(err));
    
function testCalls() {
    axios({
        method: 'post',
        url: `http://localhost:${serverPort}/create/cageCard`,
        data: {
            "activities": ["com.webridge.entity.Entity[OID[599805F209C777438032AD5C89F2301D]]", "com.webridge.entity.Entity[OID[C3414448FB15964380A43D9D1283A3FF]]"],
            "customAttributes.group": "com.webridge.entity.Entity[OID[D58EDC713721984C930D905660F29627]]",
            "approved": "true",
            "customAttributes.barcodeImage": "http://anops-dev.ovpr.uga.edu/anops/sd/Doc/0/0E1EDE722NV4D7LLVGBUCRR23F/barcode.jpg",
            "company": "com.webridge.account.Party[OID[97A90007B87AB542963583B93BA2CB48]]",
            "contacts": ["com.webridge.account.Person[OID[401D7724CB7FA146AE24C67E6DCA5207]]", "com.webridge.account.Person[OID[DA1A05C535375744B72EB52ADF615505]]"],
            "createdBy": "com.webridge.account.Person[OID[DA1A05C535375744B72EB52ADF615505]]",
            "dateActivated": "Wed Jan 1 03:00:00 EST 1800",
            "dateCreated": "Mon Nov 7 13:59:59 EST 2016",
            "dateEnteredState": "Thu Jan 19 09:23:19 EST 2017",
            "dateExpired": "Fri Dec 31 03:00:00 EST 2500",
            "dateModified": "Fri Jul 6 20:53:30 EDT 2018",
            "customAttributes.dateOfBirth": "Fri Sep 23 00:00:00 EDT 2016",
            "customAttributes.facility": "com.webridge.entity.Entity[OID[44BF9308C148BE47AC73DA031775EA6A]]",
            "customAttributes.highestPainCat": "com.webridge.entity.Entity[OID[BC4B1C0BCEE2A14C81382B5E4FB77557]]",
            "ID": "C00079264",
            "minorVersion": "1",
            "name": "C00079264",
            "customAttributes.dateOriginallyOnCensus": "Mon Nov 7 00:00:00 EST 2016",
            "customAttributes.groups": "com.webridge.eset.EntitySet[OID[5C4F41AC36F1F848B8A2FAB9174EFE1C]]",
            "customAttributes.lastOnCensusDate": "Wed Jan 18 00:00:00 EST 2017",
            "customAttributes.offCensusDate": "Wed Jan 18 00:00:00 EST 2017",
            "customAttributes.onCensusDate": "Mon Nov 7 00:00:00 EST 2016",
            "customAttributes.order": "com.webridge.entity.Entity[OID[F4A16F9AF89F604DBA4DFB917FBBEB63]]",
            "customAttributes.ugaAccount": "com.webridge.entity.Entity[OID[FA8F85851F5DF14B8A9FE4F990F8A9CF]]",
            "owner": "com.webridge.account.Person[OID[401D7724CB7FA146AE24C67E6DCA5207]]",
            "parentProject": "com.webridge.entity.Entity[OID[BD50CD40641D8F4EAC87F83EDAC30921]]",
            "customAttributes.costCenter": "com.webridge.entity.Entity[OID[51E453D6E4618D4FBD487C0AB7846E54]]",
            "projects": ["com.webridge.entity.Entity[OID[B349E096BD2A5643A2DCE9C21D210F2B]]"],
            "customAttributes.IACUCProtocol": "com.webridge.entity.Entity[OID[B349E096BD2A5643A2DCE9C21D210F2B]]",
            "resourceContainer": "com.webridge.entity.Entity[OID[6533681791AAE8449BA3AA3B8801F929]]",
            "customAttributes.sex": "com.webridge.entity.Entity[OID[FCD625F00BA8E84682C638DCC52E6241]]",
            "status": "com.webridge.entity.Entity[OID[4C72197A3F140541964F22D2E5FBB28B]]",
            "customAttributes.strain": "BALB/c",
            "type": "_CageCard",
            "customAttributes.uga_associatedInvoices_set": ["com.webridge.entity.Entity[OID[13D7FBBD5DEA344195570132AAFB62AC]]", "com.webridge.entity.Entity[OID[21FF25A0AD07874486FEEEED9E5035FA]]", "com.webridge.entity.Entity[OID[3A80CE42922B3342B41F9D05E562C638]]", "com.webridge.entity.Entity[OID[61FAB02ADB59CF46B3E99E4087D6D4B2]]", "com.webridge.entity.Entity[OID[8BABD977C97F864789103A9E7732B218]]", "com.webridge.entity.Entity[OID[9625E9BA52CCA9488EBA1996BD1AC70C]]", "com.webridge.entity.Entity[OID[B48A37EA309A244F9C3949277F69662C]]", "com.webridge.entity.Entity[OID[BD6E57DB60831243B39B6C11834A81CA]]", "com.webridge.entity.Entity[OID[D3DCDFB2D7814749B2D4CF9D2A25C705]]", "com.webridge.entity.Entity[OID[EE8FB0BDEAA7754F857D5EC3BF8A31A1]]"],
            "customAttributes.uga_cageCard_history": ["com.webridge.entity.Entity[OID[4C85EF310745454BBC9F2600F956B4A9]]"],
            "customAttributes.uga_perDiem_chartString": "com.webridge.entity.Entity[OID[D95AA05BCA6B2D49841406B3EDA1D8AF]]"
        }
    });

    // axios({
    //     method: 'post',
    //     url: `http://localhost:${serverPort}/query/cageCard`,
    //     data: {
    //         query: {"portalID": "derp"}
    //     }
    // }).then(response => {
    //     console.dir(response.data)
    // });  
}