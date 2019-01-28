let messageParser = require('../utils/messageParser.js');

var eightball = require('./eightball/eightball.js');
var help =      require('./help/help.js');
var roll =      require('./roll/roll.js');
var image =     require('./image/image.js');

const messageCommands = {
    "8ball": eightball,
    "help": help,
    "roll": roll,
    "image": image
}

module.exports = (data, prefix, messenger) => {
    let message = data.content;
    if(message.indexOf(prefix) === 0 ) {
        let command = messageParser(message, prefix);
        let mCommand = messageCommands[command.command];
        if(mCommand) mCommand(command.args, command.argument, data, messenger);
    }
}