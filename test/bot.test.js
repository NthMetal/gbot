//testing imports
var { assert } = require('chai');

//bot imports
//var Discord = require('discord.io');
var auth = require('./_fixtures/auth.json');
var Environment = require(`../src/_config/env.js`);
var EventHandler = require('../src/commands/eventHandler.js');
//var MongoClient = require('mongodb');

describe('Testing GBotBot Initialization', function() {

    it('should successfully import auth', function() {
        assert.equal(auth.token, 'discordtoken');
        assert.equal(auth.danbooru_auth, 'danbooruauth');
        assert.lengthOf(auth.keys, 4);
        assert.equal(auth.google_search_engine, 'googlesearchengine');
        assert.equal(auth.pixiv_username, 'pixivusername');
        assert.equal(auth.pixiv_password, 'pixivpassword');
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


  
  })