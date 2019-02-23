var { assert } = require('chai');
var messageParser = require('../src/commands/utils/messageParser.js');

describe('Testing Message Parser', function() {

  it('should assert image search with two args is parsed', function() {
    // create an object
    result = messageParser('&image watanabe_you kurosawa_dia')
    // now assert the volume
    assert.equal(result.command, '&image');
    assert.equal(result.args[0], 'watanabe_you');
    assert.equal(result.args[1], 'kurosawa_dia');
    assert.equal(result.argument, 'watanabe_you kurosawa_dia');
  })

})