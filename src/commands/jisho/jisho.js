const jishoApi = require('unofficial-jisho-api');
const jisho = new jishoApi();


module.exports = async (args, argument, data, messenger, db) => {

    if (argument.match(/[a-zA-Z]/i)) {
        jisho.searchForKanji(argument).then(result => {
            embedK = {
                "color": 13044974,
                "fields": [
                {
                    "name": "Kanji",
                    "value": result.data[4].senses[0].english_definitions.join(', ')
                },
                {
                    "name": "Meaning(s)",
                    "value": result.data[4].senses[0].english_definitions.join(', ')
                }
                ]
            }
        })
        messenger.embedMessage(embedK, data.channel_id);
    }else{
       jisho.searchForPhrase(argument).then(result => {
            embedP = {
                "color": 13044974,
                "fields": [
                {
                    "name": "Kanji",
                    "value": result.data[4].senses[0].english_definitions.join(', ')
                }
                ]   
            }
        })
        messenger.embedMessage(embedP, data.channel_id);
    }
    
    console.log(result);
    console.log(result.data[4].senses[0]);  
}