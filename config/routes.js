/**
 * Created with JetBrains WebStorm.
 * User: lance_sims
 * Date: 3/9/13
 * Time: 8:57 PM
 * To change this template use File | Settings | File Templates.
 */
module.exports = function(app) {
    var mongoose = require('mongoose')
        ,routes   = require('../web_app/controllers/index')
        ,user     = require('../web_app/controllers/user')
        ,partials = require('../web_app/controllers/partials');

    app.get('/', routes.index);
    app.get('/partials/:name', partials.partial);
    app.post('/api/user', user.create);
    app.put('/api/user', user.update);
    app.delete('/api/user', user.delete);
    app.post('/api/location/', user.saveUserLocation);
}
