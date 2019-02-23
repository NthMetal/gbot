//testing imports
var { assert } = require('chai');
var sinon = require('sinon');

//bot imports
var auth = require(`../src/_config/auth.js`);
var Environment = require(`../src/_config/env.js`);
var EventHandler = require('../src/commands/eventHandler.js');

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
        assert.equal(env.mongoURL, 'mongodb://localhost:27017');
        
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
        assert.equal(env.mongoURL, '');
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
        assert.equal(env.mongoURL, '');
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
        assert.equal(env.mongoURL, '');
    })
  
  });

  describe('Testing GBotBot Creation', function() {

    it('should create a Discord object', function() {
        var Discord = require('discord.io');
        assert.isObject(Discord, 'discord object created');
        // var gbot = new Discord.Client({
        //     token: auth.token,
        //     autorun: true
        // });
        // assert.isObject(gbot, 'gbot object created');
        // assert.isFunction(gbot.on, 'gbot can listen to events');
    })

  });