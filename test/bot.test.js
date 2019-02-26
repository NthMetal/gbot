//testing imports
var { assert } = require('chai');
var sinon = require('sinon');

//bot imports
var auth = require(`../src/_config/auth.js`);
var Environment = require(`../src/_config/env.js`);
var EventHandler = require('../src/commands/eventHandler.js');
var Discord = require('discord.io');
var Messenger = require('../src/commands/utils/messenger.js');
var messageHandler = require('../src/commands/message.js');
//var MongoClient = require('mongodb');

describe('Testing GBotBot Initialization', function() {

    it('should successfully import auth', function() {
        assert.isNotNull(auth, 'auth object was successfuly initialized');
        assert.isString(auth.token, 'discord token is a string');
        assert.isString(auth.danbooru_auth, 'danbooru auth key is a string');
        assert.isString(auth.pixiv_username, 'pixiv username is a string');
        assert.isString(auth.pixiv_password, 'pixiv password is a string');
    })

    it('should successfully initialize development variables', function() {
        var env = Environment.env('development');
        assert.equal(env.ENV, 'development');
        assert.equal(env.logging.logger_level, 'debug');
        assert.equal(env.logging.logger_file, 'combined.log');
        assert.isFalse(env.logging.archive_file, 'archive file disabled');
        assert.isTrue(env.logging.console_logging, 'console logging enabled');
        assert.isTrue(env.logging.message_logging, 'message logging enabled');
        assert.equal(env.default_prefix, '&');
    })

    it('should successfully initialize production variables', function() {
        var env = Environment.env('production');
        assert.equal(env.ENV, 'production');
        assert.equal(env.logging.logger_level, 'info');
        assert.equal(env.logging.logger_file, 'combined.log');
        assert.isTrue(env.logging.archive_file, 'archive file disabled');
        assert.isFalse(env.logging.console_logging, 'console logging enabled');
        assert.isFalse(env.logging.message_logging, 'message logging enabled');
        assert.equal(env.default_prefix, '&');
    })
    it('should successfully initialize production variables by default', function() {
        var env = Environment.env('');
        assert.equal(env.ENV, 'production');
        assert.equal(env.logging.logger_level, 'info');
        assert.equal(env.logging.logger_file, 'combined.log');
        assert.isTrue(env.logging.archive_file, 'archive file disabled');
        assert.isFalse(env.logging.console_logging, 'console logging enabled');
        assert.isFalse(env.logging.message_logging, 'message logging enabled');
        assert.equal(env.default_prefix, '&');
    })

    it('should successfully initialize the EventHandler', function() {
        var env = Environment.env('');
        assert.equal(env.ENV, 'production');
        assert.equal(env.logging.logger_level, 'info');
        assert.equal(env.logging.logger_file, 'combined.log');
        assert.isTrue(env.logging.archive_file, 'archive file disabled');
        assert.isFalse(env.logging.console_logging, 'console logging enabled');
        assert.isFalse(env.logging.message_logging, 'message logging enabled');
        assert.equal(env.default_prefix, '&');
    })
  
  });

  describe('Testing GBotBot Creation', function() {

    var gbot_fake = {
        on: sinon.fake(),
        sendMessage: sinon.fake(),
        uploadFile: sinon.fake(),
        deleteMessage: sinon.fake(),
        removeListener: sinon.fake(),
        addReaction: sinon.fake()
    }
    var logger_fake = {
        info: sinon.fake(),
        debug: sinon.fake()
    }

    it('should create a Discord object', function() {
        assert.isObject(Discord, 'discord object created');
    })

    it('should handle an event', function() {
        var event_8ball = {
            t: 'MESSAGE_CREATE',
            d: {
                content: '&help'
            }
        }
        var event_reaction = {
            t: 'MESSAGE_UPDATE',
            d: {
                content: '&help'
            }
        }
        var event_undefined = {
            t: 'MESSAGE_CREATE',
            d: {
                content: '&blahhh'
            }
        }
        var eventHandler = new EventHandler(gbot_fake, logger_fake);
        assert.isObject(eventHandler, 'event handler is created');
        assert.isFunction(eventHandler.handleEvent, 'handleEvent is a valid function');
        
        eventHandler.handleEvent(event_8ball, '&', gbot_fake, null);
        eventHandler.handleEvent(event_reaction, '&', gbot_fake, null);
        eventHandler.handleEvent(event_undefined, '&', gbot_fake, null);
        assert(gbot_fake.sendMessage.called);
        assert(eventHandler, 'event handler is ok after running');
    });

});

describe('messenger functionality', function() {
    var gbot_fake;
    var logger_fake;
    var eventHandler_fake;
    var messenger;

    beforeEach(() => {
        gbot_fake = sinon.createStubInstance(Discord.Client);
        logger_fake = {
            info: sinon.fake(),
            debug: sinon.fake()
        }
        eventHandler_fake = sinon.createStubInstance(EventHandler);
        messenger = new Messenger(gbot_fake, logger_fake, eventHandler_fake); 
    });

    it('should initialize messenger', function() {
        assert.isObject(messenger, 'messenger is created');
    });

    it('should send a text message', function() {  
        messenger.textMessage('test message', '1234');
        assert(gbot_fake.sendMessage.called)
        assert.equal(gbot_fake.sendMessage.args[0][0].to, '1234');
        assert.equal(gbot_fake.sendMessage.args[0][0].message, 'test message');
    });

    it('should send an image message', function() {
        messenger.imgMessage('test url', '1234', 'test message', false);
        assert(gbot_fake.sendMessage.called);
        assert.equal(gbot_fake.sendMessage.args[0][0].to, '1234');
        assert.equal(gbot_fake.sendMessage.args[0][0].message, '');
        assert.equal(gbot_fake.sendMessage.args[0][0].embed.title, 'test message');
        assert.equal(gbot_fake.sendMessage.args[0][0].embed.image.url, 'test url');
        gbot_fake.channels = { '1234': {nsfw: false}};
        messenger.imgMessage('test url', '1234', 'test message', true);
        assert.equal(gbot_fake.sendMessage.callCount, 2);
    });

    it('should send an embed message', function() {    
        messenger.embedMessage('test embed', '1234', 'test message', false);
        assert(gbot_fake.sendMessage.called);
        assert.equal(gbot_fake.sendMessage.args[0][0].to, '1234');
        assert.equal(gbot_fake.sendMessage.args[0][0].message, 'test message');
        assert.equal(gbot_fake.sendMessage.args[0][0].embed, 'test embed');
        gbot_fake.channels = { '1234': {nsfw: false}};
        messenger.imgMessage('test url', '1234', 'test message', true);
        assert.equal(gbot_fake.sendMessage.callCount, 2);
    });

    it('should upload an image', function() {
        messenger.imgUpload('test url', '1234', 'test message', false);
        assert(gbot_fake.uploadFile.called);
        assert.equal(gbot_fake.uploadFile.args[0][0].to, '1234');
        assert.equal(gbot_fake.uploadFile.args[0][0].file, 'test url');
        assert.equal(gbot_fake.uploadFile.args[0][0].message, 'test message');
        gbot_fake.channels = { '1234': {nsfw: false}};
        messenger.imgUpload('test url', '1234', 'test message', true);
        assert.equal(gbot_fake.uploadFile.callCount, 1);
    });

    it('should send an error message', async function() {
        messenger.errorMessage('test message', '1234');
        assert(gbot_fake.sendMessage.called);
        assert.equal(gbot_fake.sendMessage.args[0][0].to, '1234');
        assert.equal(gbot_fake.sendMessage.args[0][0].message.indexOf('test message'), 0);
        setTimeout(() => {
            assert(gbot_fake.deleteMessage.called);
            assert.equal(gbot_fake.deleteMessage.args[0][0].channelID, '1234');
        }, 3000);
    });

    it('should send error options', async function() {
        var options = [
            { 
                reaction: 'x', 
                msg: `1. Cancel`,
                data: 'x'
            }
        ]
        var data = {
            author: { id: 'dataauthorid' },
            channel_id: '123'
        }
        messenger.errorOptions('test command', 'test arg', options, 'test message', data);
        assert(gbot_fake.sendMessage.called);
        assert.equal(gbot_fake.sendMessage.args[0][0].to, '123');
        assert.equal(gbot_fake.sendMessage.args[0][0].message, '```test message\n1. Cancel```');
        // gbot_fake.sendMessage.args[0][1](null, {id: '123'});
        // // assert.equal(gbot_fake.sendMessage.args[0][1], '```test message\n1. Cancel```');
        // console.log(gbot_fake.sendMessage.args[0][1].args);
        // assert(messenger.errorReactionTimeout.called);
    });

    it('should add a reaction', async function() {
        var options = [
            { 
                reaction: 'x', 
                msg: `1. Cancel`,
                data: 'x'
            }
        ]
        messenger.errorReactionTimeout('123', '456', options, 0);
        setTimeout(() => {
            assert(gbot_fake.addReaction.called);
            assert.equal(gbot_fake.addReaction.args[0][0].channelID, '123');
            assert.equal(gbot_fake.addReaction.args[0][0].messageID, '456');
            assert.equal(gbot_fake.addReaction.args[0][0].reaction, '❌');
        });
    });

})

describe('basic command functionality', function() {
    it('should handle 8ball command', async function() {
        var db_fake = {
            collection: (collection_name) => {
                return {
                    findOne: () => { return {predictions: ['fakeprediction']} }
                }
            }
        }
        var data = {
            channel_id: '123'
        }
        var messenger_fake = sinon.createStubInstance(Messenger);
        
        let eball = require('../src/commands/eightball/eightball.js');
        await eball(null, null, data, messenger_fake, db_fake);
        assert(messenger_fake.textMessage.called);
        assert.equal(messenger_fake.textMessage.args[0][0], ':8ball: fakeprediction');
        assert.equal(messenger_fake.textMessage.args[0][1], '123');
    });

    it('should handle choose command', function() {
        var messenger_fake = sinon.createStubInstance(Messenger);
        var data = {
            channel_id: '123'
        }
        let choose = require('../src/commands/choose/choose.js');
        let args = ['testitem'];
        choose(args, null, data, messenger_fake, null);
        assert(messenger_fake.textMessage.called);
        assert.equal(messenger_fake.textMessage.args[0][0], 'My wisdom, unto you: testitem');
        assert.equal(messenger_fake.textMessage.args[0][1], '123');
    });
})