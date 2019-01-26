let messageParser = require('../utils/messageParser.js');

var eightball = require('./eightball/eightball.js');
var help =      require('./help/help.js');
var roll =      require('./roll/roll.js');

const messageCommands = {
    "8ball": eightball,
    "help": help,
    "roll": roll
}

module.exports = (data, prefix) => {
    let message = data.content;
    if(message.indexOf(prefix) === 0 ) {
        console.log(messageParser(message, prefix));
    }
}