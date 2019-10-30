const logger = require('../../lib/myWinston')('couchControllers.js');

exports.create = clusterConnection => async (req, res) => {
    try {
        //todo add better error handling
        let bucket = clusterConnection.openBucket(req.params.bucketName, err => {
            if (err) logger.error(err);
        });
        bucket.upsert(req.body.oid, req.body, (err, result) => {
            if (err) logger.error(err);
            logger.info(`Successfully created document with CAS: ${result.cas}`);
            res.json({ result });
        });
    } catch (e) {
        throw e;
    }
}

exports.query = clusterConnection => async (req, res) => {
    // logger.info(`Receiving post request to query entity: ${req.params.entityType} with query: ${JSON.stringify(req.body.query)}`);
    // let entity = require(`../../models/${req.params.entityType}`);
    // res.json({
    //     results: await entity.find(req.body.query || {})
    // });
}