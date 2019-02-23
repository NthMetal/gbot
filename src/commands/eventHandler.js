
//message commands
var messageHandler = require('./message.js');
var Messenger = require('./utils/messenger.js');
var messenger;

module.exports = class EventHandler {
    constructor(gbot, logger) {
        messenger = new Messenger(gbot, logger, this);
    }
 
    handleEvent(event, prefix, gbot, db) {
        switch( event.t ) {
            case 'MESSAGE_CREATE':
                messageHandler(event.d, prefix, messenger, db);
                break;
            default:
        }
    }
 }