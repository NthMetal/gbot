const helpTextFragments = [
    'Commands:',
    '`help`: Shows this help menu!',
    '`roll # #?`: rolls a random number from 0 to the first input. You can use two inputs to set a range.',
    '`8ball`: Imparts GBot\'s robotic wisdom onto you.',
    '`image`: Give GBot something to search for, and an image will be shown!',
    '`nsfw`: Just like image but way more lewd. Only in NSFW channels.',
    '`pixiv`: Posts a random image from pixiv! (includes sort by popularity).',
    '`pixivR`: Posts a random nsfw image from pixiv! Only in NSFW channels',
]

module.exports = (args, argument, data, messenger) => {
    var helpText = helpTextFragments.join('\n');
    messenger.textMessage(helpText, data.channel_id);
}