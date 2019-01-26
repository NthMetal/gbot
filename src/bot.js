var Discord = require('discord.io');
var auth = require('./_config/auth.json');
var {logger} = require('./logger/logger.js');
var {env} = require(`./_config/env.js`);

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

console.log("starting bot");

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    logger.info('GBot is running in '+ env.ENV + 'environment');
    logger.debug('---------This should not be visible in production');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
           case 'ping':
               bot.sendMessage({
                   to: channelID,
                   message: 'Pong!'
               });
           break;
        }
     }
});