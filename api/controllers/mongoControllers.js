const logger = require('../../lib/myWinston')('mongoControllers.js');

exports.create = async (req, res) => {
    try {
        logger.info(`Receiving post request to create entity: ${req.params.entityType} using ${JSON.stringify(req.body)}`);
        let entity = require(`../../models/${req.params.entityType}`);
        await entity.create(req.body);
        res.json({message: "success"})
        logger.info(`Successfully created with JSON: ${JSON.stringify(req.body)}`);
    } catch (e) {
        throw e;
    }
}

exports.query = async (req, res) => {
    logger.info(`Receiving post request to query entity: ${req.params.entityType} with query: ${JSON.stringify(req.body.query)}`);
    let entity = require(`../../models/${req.params.entityType}`);
    res.json({
        results: await entity.find(req.body.query || {})
    });
}