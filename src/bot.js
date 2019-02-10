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
});

console.log("connecting to gbot's brain");

MongoClient.connect(env.mongoURL, function(err, client) {
    if(err) throw err;
    console.log("gbot's brain is now connected");
   
    console.log("starting gbot");

    const db = client.db('gbot');

    gbot.on('any', (event) => eventHandler(event, prefix, gbot, db));
   
    gbot.on('disconnect', ()=> {
        client.close();
    })
    
  });