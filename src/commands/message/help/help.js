const helpTextFragments = [
    'help',
    'text'
]

module.exports = (args, argument, data, messenger, error) => {
    var helpText = helpTextFragments.join('\n');
    messenger.textMessage(helpText, data.channel_id);
}