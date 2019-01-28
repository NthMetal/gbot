
let gbot;
let logger;
let initialized = false;

function initialize(bot, logging) {
    gbot = bot;
    logger = logging;
    initialized = true;
    logger.info("Successfuly initialized messenger");
}

function textMessage(message, channelID) {
    if(!initialized) return;
    logger.info(`sending message to ${channelID}`);
    gbot.sendMessage({
        to: channelID,
        message: message
    });
    logger.debug(`successfully sent message to ${channelID}`);
    logger.debug(`message sent: ${message}`);
}

function imgMessage(imgURL, channelID) {
    if(!initialized) return;
    logger.info(`sending image to ${channelID}`);
    gbot.sendMessage({
        to: channelID,
        message: '',
        embed: {
            color: 0xB00B15,
            image: {
                url: imgURL
            }
        }
    });
    logger.debug(`successfully sent image to ${channelID}`);
    logger.debug(`image url sent: ${imgURL}`);
}

module.exports.messenger = {
    initialize: initialize,
    textMessage: textMessage,
    imgMessage: imgMessage
}