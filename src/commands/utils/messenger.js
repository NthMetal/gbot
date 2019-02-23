let emojis = require('./_lib/reactionemojis.json');
let eventHandler = require('../eventHandler.js');

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
    // console.log(gbot.channels[channelID].nsfw);
    logger.info(`sending message to ${channelID}`);
    gbot.sendMessage({
        to: channelID,
        message: message
    });
    logger.debug(`successfully sent message to ${channelID}`);
    logger.debug(`message sent: ${message}`);
}

function imgMessage(imgURL, channelID, message, nsfw=false) {
    if(!initialized) return;
    if(nsfw && !gbot.channels[channelID].nsfw) {
        errorMessage(`GBot can't post an nsfw image in this channel D:`, channelID);
        return;
    }
    logger.info(`sending image to ${channelID}`);
    gbot.sendMessage({
        to: channelID,
        message: '',
        embed: {
            color: 0xB00B15,
            title: message,
            image: {
                url: imgURL
            }
        }
    });
    logger.debug(`successfully sent image to ${channelID}`);
    logger.debug(`image url sent: ${imgURL}`);
}

function embedMessage(embed, channelID, message, nsfw=false){
    if(!initialized) return;
    if(nsfw && !gbot.channels[channelID].nsfw) {
        errorMessage(`GBot can't post an nsfw image in this channel D:`, channelID);
        return;
    }
    logger.info(`sending embed to ${channelID}`);
    gbot.sendMessage({
        to: channelID,
        message: message,
        embed: embed
    });
    logger.debug(`successfully created an embed to ${channelID}`);
}

function imgUpload(imgURL, channelID, message, nsfw=false) {
    if(!initialized) return;
    console.log(channelID);
    if(nsfw && !gbot.channels[channelID].nsfw){
        errorMessage(`GBot can't post an nsfw image in this channel D:`, channelID);
        return;
    }
    logger.info(`sending image to ${channelID}`);
    gbot.uploadFile({
        to: channelID,
        file: imgURL,
        message: message
    });
    logger.debug(`successfully uploaded image to ${channelID}`);
    logger.debug(`image uploaded: ${imgURL}`);
}

function errorMessage(message, channelID) {
    if(!initialized) return;
    logger.info(`sending message to ${channelID}`);
    var msgID;
    gbot.sendMessage({
        to: channelID,
        message: message + '\nᵗʰᶦˢ ᵐᵉˢˢᵃᵍᵉ ʷᶦˡˡ ˢᵉˡᶠ ᵈᵉˢᵗʳᵘᶜᵗ ᶦⁿ ³ ˢᵉᶜᵒⁿᵈˢ'
    }, (error, res) => {
        msgID = res.id;
    })
    logger.debug(`successfully sent message to ${channelID}`);
    logger.debug(`message sent: ${message}`);
    setTimeout(() => {
        console.log(msgID);
        gbot.deleteMessage({
            channelID: channelID,
            messageID: msgID
        })
    }, 3000);
}

function errorOptions(command, argument, options, message, data) {
    if(!initialized) return;
    logger.info(`presenting  to ${data.channel_id}`);
    var msgID;
    for(var i=0;i<options.length;i++){
        message += '\n' + options[i].msg;
    }
    var id = gbot.sendMessage({
        to: data.channel_id,
        message: '```'+message+'```'
    }, (error, res) => {
        msgID = res.id;
        logger.debug(`successfully sent message to ${data.channel_id}`);
        logger.debug(`message sent: ${message}`);
        for(var i=0;i<options.length;i++){
            errorReactionTimeout(data.channel_id, res.id, options, i);
        }
        let listenForReaction = (event) => {
            if(event.t === 'MESSAGE_REACTION_ADD' &&
                event.d.message_id === res.id &&
                event.d.user_id === data.author.id) {
                const selectedData = options.find(option => emojis[option.reaction] === event.d.emoji.name).data;
                let newData = data;
                newData.content = `${data.content[0]}${command} ${selectedData}`
                // console.log(newData);
                const pseudoEvent = {
                    t: 'MESSAGE_CREATE',
                    d: data
                }
                gbot.deleteMessage({
                    channelID: data.channel_id,
                    messageID: msgID
                });
                if(selectedData !== 'x') {
                    eventHandler.eventHandler(pseudoEvent, data.content[0], gbot);
                }
                gbot.removeListener('any', listenForReaction);
            }
        }
        gbot.on('any', listenForReaction);
        setTimeout(() => {
            gbot.removeListener('any', listenForReaction);
            gbot.deleteMessage({
                channelID: data.channel_id,
                messageID: msgID
            })
        }, 60000)
    })
}


// { t: 'MESSAGE_REACTION_ADD',
//   s: 5,
//   op: 0,
//   d:
//    { user_id: '154333042339479553',
//      message_id: '542877419917279328',
//      emoji: { name: '1⃣', id: null, animated: false },
//      channel_id: '345578252959612942',
//      guild_id: '345067118183710720' } }
function errorReactionTimeout(channelID, messageID, options, index) {
    setTimeout(() => {
        gbot.addReaction({
            channelID: channelID,
            messageID: messageID,
            reaction: emojis[options[index].reaction]
        }, function(err, res) {
            if (err) { throw err; }
        });
    }, 450*index);
}

module.exports.messenger = {
    initialize: initialize,
    textMessage: textMessage,
    imgMessage: imgMessage,
    embedMessage: embedMessage,
    imgUpload: imgUpload,
    errorMessage: errorMessage,
    errorOptions: errorOptions
}