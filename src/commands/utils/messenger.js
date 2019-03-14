let emojis = require('./_lib/reactionemojis.json');

let gbot;
let logger;
let eventHandler;

module.exports = class Messenger {
    constructor(bot, logging, handler) {
        gbot = bot;
        logger = logging;
        eventHandler = handler;
        logger.info("Successfuly initialized messenger");
    }

    textMessage(message, channelID) {
        logger.info(`sending message to ${channelID}`);
        gbot.sendMessage({
            to: channelID,
            message: message
        });
        logger.debug(`successfully sent message to ${channelID}`);
        logger.debug(`message sent: ${message}`);
    }
    
    imgMessage(imgURL, channelID, message, nsfw=false) {
        if(nsfw && !gbot.channels[channelID].nsfw) {
            this.errorMessage(`GBot can't post an nsfw image in this channel D:`, channelID);
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
    
    embedMessage(embed, channelID, message, nsfw=false){
        if(nsfw && !gbot.channels[channelID].nsfw) {
            this.errorMessage(`GBot can't post an nsfw image in this channel D:`, channelID);
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
    
    imgUpload(imgURL, channelID, message, nsfw=false) {
        if(nsfw && !gbot.channels[channelID].nsfw){
            this.errorMessage(`GBot can't post an nsfw image in this channel D:`, channelID);
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
    
    errorMessage(message, channelID) {
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
    
    errorOptions(command, argument, options, message, data) {
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
                this.errorReactionTimeout(data.channel_id, res.id, options, i);
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
                        eventHandler.handleEvent(pseudoEvent, data.content[0], gbot);
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

    errorReactionTimeout(channelID, messageID, options, index) {
        setTimeout(() => {
            gbot.addReaction({
                channelID: channelID,
                messageID: messageID,
                reaction: emojis[options[index].reaction]
            }, function(err, res) {
                if (err) { throw err; }
            });
        }, 650*index);
    }
}