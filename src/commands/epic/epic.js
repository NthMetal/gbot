var GIFEncoder = require('gifencoder');
var Canvas = require('canvas');
var fs = require('fs');

const successMessage = 'You got a';

module.exports = async (args, argument, data, messenger, db) => {
    // let epicList = await db.collection('dfotemp').findOne({ name: '90 hell epics' });
    let randomEpic = await db.collection('dfotemp').aggregate(
        [ 
            { $match : { name : "90 hell epics" } },
            { $unwind: "$items" }, 
            { $sample: { "size": 1 } } 
        ]
    ).toArray();

    // var encoder = new GIFEncoder(320, 240);
    // encoder.createReadStream().pipe(fs.createWriteStream('myanimated.gif'));
    if(!randomEpic) return; //TODO Error message

    var random = randomEpic[0].items;
    var itemURL = `http://wiki.dfo-world.com/images/${random.imageName}.png`
    var embed = {
        title: `${successMessage} ${random.name}!`,
        thumbnail: {
            url: itemURL,
        }
    }
    messenger.embedMessage(embed, data.channel_id);

    var dbresult;
    if(await db.collection('users').findOne({discordID: data.author.id}).count()){
        await db.collection('users').update({discordID: data.author.id},)
    }else{

    }
    
    console.log(data);
    // saveEpic
    // messenger.textMessage('in Development');
}