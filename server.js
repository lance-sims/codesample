/**
 * Module dependencies.
 */

var express    = require('express')
    , fs       = require('fs')
    , http     = require('http')
    , path     = require('path')
    , env      = process.env.NODE_ENV || 'development'
    , config   = require('./config/config')[env]
    , mongoose = require('mongoose')
    , modelsApi = require('./web_app/api/modelsApi');

//bootstrap the database connection
//connect to mongo
mongoose.connect(config.db);
//bootstrap the models
modelsApi.loadModels();

var app = express();
//express settings
require('./config/express')(app, config);

//bootstrap the ruotes
require('./config/routes')(app);

var port = process.env.PORT || 3000
app.listen(port)
console.log('Express app started on port ' + port);
