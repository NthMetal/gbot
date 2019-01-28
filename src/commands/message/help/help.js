const helpTextFragments = [
    'Commands:',
    '`help`: Shows this help menu!',
    '`roll # #?`: rolls a random number from 0 to the first input. You can use two inputs to set a range.',
    '`8ball`: Imparts GBot\'s robotic wisdom onto you.'
]

module.exports = (args, argument, data, messenger) => {
    var helpText = helpTextFragments.join('\n');
    messenger.textMessage(helpText, data.channel_id);
}