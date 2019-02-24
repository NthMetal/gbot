//testing imports
var { assert } = require('chai');
var sinon = require('sinon');

//bot imports
var auth = require(`../src/_config/auth.js`);
var Environment = require(`../src/_config/env.js`);
var EventHandler = require('../src/commands/eventHandler.js');
var Discord = require('discord.io');
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

    it('should handle 8ball command', function() {
        // var predictions_fake = ;
        var db_fake = {
            collection: (collection_name) => {
                return {
                    findOne: (query) => {
                        return {
                            predictions: ['testprediction0']
                        }
                    }
                }
            }
        }
        var data = {
            channel_id: '123'
        }
        var messenger_fake = {
            textMessage: (message, chid) => {
                //assert.equal(message,':8ball: testprediction');
            }
        }
        let eball = require('../src/commands/eightball/eightball.js');
        eball(null, null, data, messenger_fake, db_fake);
        // assert(db_fake.collection('basic').findOne({ name: 'eight ball' }).predictions.returned);
        //assert(messenger_fake.textMessage.called);
    });

  });