const cluster = require('cluster');
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
    require('dotenv').config();
    const http = require('http');
    const logger = require('./lib/myWinston')('server.js');
    const express = require('express');
    const app = express();
    const mongoose = require('mongoose');
    const couchbase = require('couchbase');

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

    function connectMongo() {
        
        const mongodbURL = process.env.MONGO_URL || "localhost";
        const mongodbPort = process.env.MONGO_PORT || "27017";
        const mongodbName = process.env.MONGO_DBNAME || 'phortal';
        
        return mongoose
            .connect(`mongodb://${mongodbURL}:${mongodbPort}/${mongodbName}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(r => {
                logger.info(`Cluster ${cluster.worker.id} Connected to MongoDB`);
            })
            .catch(err => logger.error(err));
    }

    function connectCouch() {
        
        const clusterUrl = process.env.COUCH_CLUSTER_URL || localhost;
        return new Promise(resolve => {
            const cluster = couchbase.Cluster(clusterUrl);
            resolve(cluster);
        });

    }

    }
    Promise.all([
        connectMongo(),
        connectCouch()
    ]).then(connections => {

        const [mongoConnection, cbClusterConnection] = connections;

        //* Apply Routes
        require('./api/routes/mongoRoutes')(app, mongoConnection);
        require('./api/routes/couchRoutes')(app, cbClusterConnection);

        http.createServer(app).listen(serverPort);
        logger.info(`Cluster ${cluster.worker.id} listening on port ${serverPort}`);
    });