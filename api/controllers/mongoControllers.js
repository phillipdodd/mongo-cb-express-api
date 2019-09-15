const logger = require('../../lib/myWinston')('mongoControllers.js');

exports.create = async (req, res) => {
    logger.info(`Receiving post request to create entity: ${req.params.entityType}`);
    switch (req.params.entityType.toLowerCase()) {
        case "cagecard":
            let CageCard = require('../../models/CageCard');
            await CageCard.create(req.body);
            logger.info(`CageCard successfully created with JSON: ${JSON.stringify(req.body)}`)
            break;

        default:
            break;
    }
}

exports.query = async (req, res) => {
    logger.info(`Receiving post request to query entity: ${req.params.entityType} with query: ${JSON.stringify(req.body.query)}`);
    switch (req.params.entityType.toLowerCase()) {
        case "cagecard":
            let CageCard = require('../../models/CageCard');
            res.json({
                results: await CageCard.find(req.body.query || {})
            });
    }
}