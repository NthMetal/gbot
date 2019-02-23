const helpTextFragments = [
    'Commands:',
    '`help`: Shows this help menu!',
    '`roll # #?`: rolls a random number from 0 to the first input. You can use two inputs to set a range.',
    '`8ball`: Imparts GBot\'s robotic wisdom onto you.',
    '`image`: Give GBot something to search for, and an image will be shown!',
    '`nsfw`: Just like image but way more lewd. Only in NSFW channels.',
    '`pixiv`: Posts a random image from pixiv! (includes sort by popularity).',
    '`pixivR`: Posts a random nsfw image from pixiv! Only in NSFW channels',
    '',
    '`epic`: Draws a random 85-90 epic for you!',
    '',
    '`I\'m also open source! check it out here`: <https://github.com/NthMetal/gbot>'
]

module.exports = (args, argument, data, messenger, db) => {
    var helpText = helpTextFragments.join('\n');
    messenger.textMessage(helpText, data.channel_id);
}