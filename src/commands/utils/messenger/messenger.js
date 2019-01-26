
let gbot;
let initialized = false;

function initialize(bot) {
    gbot = bot;
    initialized = true;
    console.log("initializing");
}

function textMessage(message, channelID) {
    if(!initialized) return;
    gbot.sendMessage({
       to: channelID,
       message: message
    });
}

module.exports.messenger = {
    initialize: initialize,
    textMessage: textMessage,
}