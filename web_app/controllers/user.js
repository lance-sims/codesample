'use strict';

var userApi = require('../api/userApi')

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.create = function(req, res) {
    console.log('user is: ' + req.body.userName);
    userApi.createUser({name:req.body.userName || ''}, function(err, data) {
        if(err) {
            res.send(500, 'exception while saving user: ' + JSON.stringify(err));
        } else {
            res.send(200, {data:data});
        }
    });
}

exports.delete = function(req, res) {
    console.log('going to delete user');
}

exports.update = function(req, res) {
    console.log('going to update user');
}

exports.saveUserLocation = function(req, res) {
    console.log('saving user location');
    var userObj = {};
    userApi.saveUserLocation(userObj, function(err, data) {
        console.log('hi');
    });
}