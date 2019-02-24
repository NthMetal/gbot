var Discord = require('discord.io');
var auth = require('./_config/auth.js');
var {logger} = require('./logger/logger.js');
var Environment = require(`./_config/env.js`);
var EventHandler = require('./commands/eventHandler.js');
var MongoClient = require('mongodb');

var gbot = new Discord.Client({
   token: auth.token,
   autorun: true
});

var env = Environment.env(process.env.NODE_ENV);
var prefix = env.default_prefix;
var eventHandler = new EventHandler(gbot, logger);

gbot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(gbot.username + ' - (' + gbot.id + ')');
    logger.info('GBot is running in '+ env.ENV + 'environment');
    logger.debug('---------This should not be visible in production');
    gbot.setPresence({ status: 'online', game: { name: 'with Flora' } });
});

console.log("connecting to gbot's brain");

MongoClient.connect(auth.mongoAWS || "mongodb://localhost:27017", function(err, client) {
    if(err) throw err;
    console.log("gbot's brain is now connected");
   
    console.log("starting gbot");

    const db = client.db('gbot');

    gbot.on('any', (event) => eventHandler.handleEvent(event, prefix, gbot, db));
   
    gbot.on('disconnect', ()=> {
        client.close();
    })
});