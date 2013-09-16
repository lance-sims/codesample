/**
 * Module dependencies.
 */

var express = require('express');

module.exports = function (app, config) {

    app.set('showStackError', true);
    // should be placed before express.static
    app.use(express.compress({
        filter: function (req, res) {
            return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
        },
        level: 9
    }));
    //app.use(express.favicon(config.root + '/public/images/favicon.ico'));
    app.use(express.static(config.root + '/public'));

    app.use(express.logger('dev'));
    app.use(express.bodyParser());

    app.use(express.cookieParser('mangledmoney'));
    app.set('views', config.root + '/web_app/views');
    app.set('view engine', 'ejs');
    console.log('CONFIG ROOT IS ' + config.root);
}
