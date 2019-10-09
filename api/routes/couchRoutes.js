var couchControllers = require('../controllers/couchControllers');
// https: //docs.couchbase.com/nodejs-sdk/2.1/managing-connections.html
module.exports = (app, cbClusterConnection) => {
    app.route('/cb/create/:bucketName')
        .post(couchControllers.create(cbClusterConnection));

    app.route('/cb/query/:bucketName')
        .post(couchControllers.query(cbClusterConnection));
}