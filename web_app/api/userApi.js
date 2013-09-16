/**
 * Created with JetBrains WebStorm.
 * User: lance
 * Date: 9/15/13
 * Time: 8:59 AM
 */
'use strict';
var mongoose = require('mongoose')
    ,User = mongoose.model('User');

module.exports.createUser = function(userObj, callback) {
    try {
        var user = new User();
        user.name = userObj.name;
        user.save(callback);
    } catch(e) {
        console.error('Exception while saving user: ' + e.message);
    }
}

module.exports.saveUserLocation = function(userObj, callback) {
    try {
        var location = new Location();
        location.lat = userObj.lat;
        location.lon = userObj.lon;
        location.userId = Mongoose.SchemaTypes.ObjectID(userObj.userId);
    } catch(e) {
        console.error('Exception while saving user location: ' + e.message);
    }
}
