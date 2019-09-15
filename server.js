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
    .connect(`mongodb://${dbURL}:${dbPort}/${dbName}`, {useNewUrlParser: true})
    .then(r => {
        logger.info(`Connected to db`);
        http.createServer(app).listen(serverPort);
        logger.info(`App listening on port ${serverPort}`);
        
        testCalls();
    })
    .catch(err => logger.error(err));
    
function testCalls() {
    // axios({
    //     method: 'post',
    //     url: `http://localhost:${port}/create/cageCard`,
    //     data: {
    //         portalID: 'derp'
    //     }
    // });

    axios({
        method: 'post',
        url: `http://localhost:${serverPort}/query/cageCard`,
        data: {
            query: {"portalID": "derp"}
        }
    }).then(response => {
        console.dir(response.data)
    });  
}