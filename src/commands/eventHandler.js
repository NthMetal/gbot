
//message commands
var messageHandler = require('./message/message.js');
var {messenger} = require('./utils/messenger/messenger.js');

module.exports.initialize = (gbot, logger) => {
    messenger.initialize(gbot, logger);
}

module.exports.eventHandler = (event, prefix, gbot) => {
    switch( event.t ) {
        case 'MESSAGE_CREATE':
            messageHandler(event.d, prefix, messenger);
            break;
        default:
    }
};