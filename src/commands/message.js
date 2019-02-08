let messageParser = require('./utils/messageParser.js');

var eightball = require('./eightball/eightball.js');
var help =      require('./help/help.js');
var roll =      require('./roll/roll.js');
var image =     require('./image/image.js');

var nsfw =     require('./nsfw/nsfw.js');
var pixiv =    require('./pixiv/pixiv.js');

const messageCommands = {
    "8ball": eightball,
    "help": help,
    "roll": roll,
    "image": image,
    "nsfw": nsfw,
    "pixiv": pixiv,
    "pixivR": pixiv
}

module.exports = (data, prefix, messenger) => {
    let message = data.content;
    if(message.indexOf(prefix) === 0 ) {
        let command = messageParser(message, prefix);
        let mCommand = messageCommands[command.command];
        if(mCommand) mCommand(command.args, command.argument, data, messenger);
    }
}