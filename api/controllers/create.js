const logger = require('../../lib/myWinston')('create.js');

module.exports = async function (req, res) {
    logger.info(`Receiving post request to create entity: ${req.params.entity}`);
    switch (req.params.entity.toLowerCase()) {
        case "cagecard":
            let CageCard = require('../../models/CageCard');
            await CageCard.create(req.body);
            logger.info(`CageCard successfully created with JSON: ${JSON.stringify(req.body)}`)
            break;
    
        default:
            break;
    }
}
