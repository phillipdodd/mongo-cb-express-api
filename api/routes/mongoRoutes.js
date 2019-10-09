var mongoControllers = require('../controllers/mongoControllers');
module.exports = (app, mongoConnection) => {
    app.route('/mongo/create/:entityType')
        .post(mongoControllers.create);
    
    app.route('/mongo/query/:entityType')
        .post(mongoControllers.query);
}