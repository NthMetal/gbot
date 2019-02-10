var Discord = require('discord.io');
var auth = require('./_config/auth.json');
var {logger} = require('./logger/logger.js');
var {env} = require(`./_config/env.js`);
var eventHandler = require('./commands/eventHandler.js');
var MongoClient = require('mongodb');
 


var gbot = new Discord.Client({
   token: auth.token,
   autorun: true
});

var prefix = env.default_prefix;
eventHandler.initialize(gbot, logger);
eventHandler = eventHandler.eventHandler;





gbot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(gbot.username + ' - (' + gbot.id + ')');
    logger.info('GBot is running in '+ env.ENV + 'environment');
    logger.debug('---------This should not be visible in production');
    gbot.setPresence({ status: 'online', game: { name: 'with @Lichaes' } });
    // gbot.sendMessage({to: '537108393626697748', message: 'n!marry <@!101794991625490432>'})
    // gbot.sendMessage({to: '537108393626697748', message: 'yes'})
});

console.log("connecting to gbot's brain");

MongoClient.connect(env.mongoURL, function(err, client) {
    if(err) throw err;
    console.log("gbot's brain is now connected");
   
    console.log("starting gbot");

    const db = client.db('gbot');

    gbot.on('any', (event) => eventHandler(event, prefix, gbot, db));
   
    // client.close();
  });
// gbot.on('message', function (user, userID, channelID, message, evt) {
//     if(message.indexOf(prefix) === 0 ) {
//     }
//     if (message.substring(0, 1) == '!') {
//         var args = message.substring(1).split(' ');
//         var cmd = args[0];
//         args = args.splice(1);
//         switch(cmd) {
//             case 'help':
//                 gbot.sendMessage({
//                     to: channelID,
//                     message: "GBot only has `!roll #` command right now :(\nI'll have more soon though! :D"
//                 });
//                 break;
//             case 'roll':
//                 var number = Math.floor(Math.random()*args[0]);
//                 gbot.sendMessage({
//                     to: channelID,
//                     message: number
//                 });
//                 break;
//         }
//     }
// });