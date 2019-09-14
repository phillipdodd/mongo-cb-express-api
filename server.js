require('dotenv').config();
const http = require('http');
const logger = require('./lib/myWinston')('server.js');
const express = require('express');
const app = express();
const mongoose = require('mongoose');



//? used for testing
const axios = require('axios');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const handleCreate = require('./api/controllers/create');
//? should this be in a routes folder?
app.route('/create/:entity')
    .post(handleCreate);

const handleQuery = require('./api/controllers/query');
app.route('/query/:entity')
    .post(handleQuery);

var port = process.env.SSL_PORT || 4000;
// var sslOptions = {
//     pfx: fs.readFileSync(process.env.SSL_PFX),
//     passphrase: process.env.SSL_PASS
// }

mongoose
    .connect('mongodb://localhost:27017/my_database', {useNewUrlParser: true})
    .then(r => {
        
        logger.info(`Connected to db`);
        http.createServer(app).listen(port);
        logger.info(`App listening on port ${port}`);
        
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
        url: `http://localhost:${port}/query/cageCard`,
        data: {
            query: {"portalID": "derp"}
        }
    }).then(response => {
        console.dir(response.data)
    });  
}