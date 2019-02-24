let messageParser = require('./utils/messageParser.js');

var eightball = require('./eightball/eightball.js');
var help =      require('./help/help.js');
var roll =      require('./roll/roll.js');
var image =     require('./image/image.js');

var nsfw =      require('./nsfw/nsfw.js');
var pixiv =     require('./pixiv/pixiv.js');
var epic =      require('./epic/epic.js');

var youtube =   require('./youtube/youtube.js');
var choose =    require('./choose/choose.js');
var jisho =     require('./jisho/jisho.js');

const messageCommands = {
    "8ball": eightball,
    "help": help,
    "roll": roll,
    "image": image,
    "nsfw": nsfw,
    "pixiv": pixiv,
    "pixivR": pixiv,
    "epic": epic,
    "youtube": youtube,
    "choose": choose,
    "jisho": jisho
}

module.exports = async (data, prefix, messenger, db) => {
    let message = data.content;
    /* istanbul ignore else  */
    if(message.indexOf(prefix) === 0 ) {
        let command = messageParser(message, prefix);
        let mCommand = messageCommands[command.command];
        if(mCommand) mCommand(command.args, command.argument, data, messenger, db);
    }
    // console.log(data);
    // if(data.channel_id === '345067118649147392' && data.author.id === '154333042339479553'){
    // TODO: this needs to be moved
    /* istanbul ignore next */
    if(data.channel_id === '537108393626697748' && data.author.id === '101794991625490432'){
        console.log("lich comment in cutem")
        data.content.split(/[\<\>]/).filter(item => item[0]===':').forEach(async emoji => {
            console.log("adding emoji: ", emoji);
            let result = await db.collection('lichaesflashcards').updateOne(
                { emote: `<${emoji}>` },
                { $inc: { quantity: 1 } },
                { upsert: true}
            )
            // console.log(result);
        });
    }
}