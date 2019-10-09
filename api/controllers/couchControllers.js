const logger = require('../../lib/myWinston')('couchControllers.js');

exports.create = connection => async (req, res) => {
    try {
        
    } catch (e) {
        throw e;
    }
}

exports.query = connection => async (req, res) => {
    logger.info(`Receiving post request to query entity: ${req.params.entityType} with query: ${JSON.stringify(req.body.query)}`);
    let entity = require(`../../models/${req.params.entityType}`);
    res.json({
        results: await entity.find(req.body.query || {})
    });
}