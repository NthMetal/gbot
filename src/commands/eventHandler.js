
//message commands
var messageHandler = require('./message/message.js');

module.exports.eventHandler = (event, prefix) => {
    switch( event.t ) {
        case 'MESSAGE_CREATE':
            messageHandler(event.d, prefix);
            break;
        default:
    }
};