var mongoControllers = require('../controllers/mongoControllers');
module.exports = app => {
    app.route('/create/:entityType')
        .post(mongoControllers.create);
    
    app.route('/query/:entityType')
        .post(mongoControllers.query);
}