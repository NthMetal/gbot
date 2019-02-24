const jishoApi = require('unofficial-jisho-api');
const jisho = new jishoApi();


module.exports = async (args, argument, data, messenger, db) => {

    if (argument.match(/[a-zA-Z]/i)) {
        jisho.searchForPhrase(argument).then(result => {
            var embedP = {
                "color": 13044974,
                "fields": [
                {
                    "name": "Kanji",
                    "value": result.data[0].slug
                },
                {
                    "name": "Kana Reading",
                    "value": result.data[0].japanese.map(item => item.reading).join('　｜　')
                },
                {
                    "name": "Meaning(s)",
                    "value": result.data[0].senses[0].english_definitions.join(', ')
                },
                {
                    "name": "Parts of Speech:",
                    "value": result.data[0].senses[0].parts_of_speech.join(', ')
                }
                ]
            }
            console.log(result); 
            console.log(result.data[0].senses[0]);
            console.log(result.data[0].japanese[0]);
            console.log(result.data[0].attribution);
            messenger.embedMessage(embedP, data.channel_id, '');
            console.log(embedP);
        }).catch( err => {
            messenger.errorMessage("Invalid input.", data.channel_id);
        })
    }else{
       jisho.searchForKanji(argument).then(result => {
            var embedK = {
                "color": 13044974,
                "thumbnail": {
                    "url": result.strokeOrderGifUri
                },
                "fields": [
                {
                    "name": "Meaning",
                    "value": result.meaning
                },
                {
                    "name": "くんよみ / JP Reading",
                    "value": result.kunyomi.join('　｜　')
                },
                {
                    "name": "おんよみ / CN Reading",
                    "value": result.onyomi.join('　｜　')
                },
                {
                    "name": "Jisho URL",
                    "value": result.uri
                }
                ]   
            }
            //console.log(result);
            messenger.embedMessage(embedK, data.channel_id, '');
            //console.log(embedK);
        }).catch( err => {
            messenger.errorMessage("Invalid input.", data.channel_id);
        })
    }
}