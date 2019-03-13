const jishoApi = require('unofficial-jisho-api');
const jisho = new jishoApi();

embedCreator = {
    english: (result) => {
        return {
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
    },
    japanese: (result) => {
        return {
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
    }
}

module.exports = async (args, argument, data, messenger, db) => {
    let { language, searchFunction } = argument.match(/[a-zA-Z]/i) ? 
    {language: 'english', searchFunction: 'searchForPhrase'} : 
    {language: 'japanese', searchFunction: 'searchForKanji'};
    
    jisho[searchFunction](argument).then(result => {
        var embedP = embedCreator[language](result);
        messenger.embedMessage(embedP, data.channel_id, '');
    }).catch( err => {
        messenger.errorMessage("Invalid input.", data.channel_id);
    })
}