const logger = require('../../lib/myWinston')('query.js');

module.exports = async function(req, res) {
    logger.info(`Receiving post request to query entity: ${req.params.entity} with query: ${JSON.stringify(req.body.query)}`);
    switch (req.params.entity.toLowerCase()) {
        case "cagecard":
           let CageCard = require('../../models/CageCard');
           res.json({
               results: await CageCard.find(req.body.query || {})
           });
    }
}