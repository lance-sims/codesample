var messages = require('./bundle/messages_en');


module.exports = {
    development: {
        root: require('path').normalize(__dirname + '/..'),
        app: {
            name: messages.app.name
        },
        db: 'mongodb://localhost/codesample',
        appTitle: messages.app.title

    }, test: {

    }, production: {

    }
}
