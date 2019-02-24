const jishoApi = require('unofficial-jisho-api');


module.exports = async (args, argument, data, messenger, db) => {
    var outcome = 
    messenger.textMessage(argument+ ' is ' +outcome, data.channel_id);
}