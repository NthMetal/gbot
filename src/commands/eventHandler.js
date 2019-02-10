
//message commands
var messageHandler = require('./message.js');
var {messenger} = require('./utils/messenger.js');

module.exports.initialize = (gbot, logger) => {
    messenger.initialize(gbot, logger);
}

module.exports.eventHandler = (event, prefix, gbot, db) => {
    switch( event.t ) {
        case 'MESSAGE_CREATE':
            messageHandler(event.d, prefix, messenger, db);
            break;
        default:
    }
};