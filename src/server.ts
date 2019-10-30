/* eslint-disable no-inner-declarations */
import * as cluster from 'cluster';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as http from 'http';
import express from 'express';
const app = express();
import createLoggerFor from './lib/myWinston';
const logger = createLoggerFor('server.js');

if (cluster.isMaster) {
    var cpuCount = require('os').cpus().length;
    for (var i = 0; i < cpuCount; i++) {
        cluster.fork();
    }
    cluster.on('exit', function (worker) {
        console.log(`Worker ${worker.id} died :(`);
        cluster.fork();
    });
} else {
    dotenv.config();


    //* Apply Middleware
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require('./middleware/removeEmptyProperties'));
    
    
    
    const serverPort = process.env.SSL_PORT || 4000;
    // var sslOptions = {
    //     pfx: fs.readFileSync(process.env.SSL_PFX),
    //     passphrase: process.env.SSL_PASS
    // }

    let mongoConnection = connectMongo();
    
    //* Apply Routes
    require('./api/routes/mongoRoutes')(app, mongoConnection);

    http.createServer(app).listen(serverPort);
    logger.info(`Cluster ${cluster.worker.id} listening on port ${serverPort}`);

    function connectMongo() {
        
        const mongodbURL = process.env.MONGO_URL || "localhost";
        const mongodbPort = process.env.MONGO_PORT || "27017";
        const mongodbName = process.env.MONGO_DBNAME || 'phortal';
        
        return mongoose
            .connect(`mongodb://${mongodbURL}:${mongodbPort}/${mongodbName}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                logger.info(`Cluster ${cluster.worker.id} Connected to MongoDB`);
            })
            .catch(err => logger.error(err));
    }

}
