module.exports = (args, argument, data, messenger, db) => {


    var embed = {
        "color": 13044974,
        "title": "Commands:",
        "footer": {
            "icon_url": "https://cdn.discordapp.com/emojis/545428771876896768.png",
            "text": "I'm also open source! Check it out here: https://github.com/NthMetal/gbot"
        },
        "fields": [
        {
            "name": "help",
            "value": "Shows this help menu!"
        },
        {
            "name": "roll # #?",
            "value": "Rolls a random number from 0 to the first input. You can use two inputs to set a range."
        },
        {
            "name": "8ball",
            "value": "Imparts GBot\'s robotic wisdom onto you!"
        },
        {
            "name": "choose",
            "value": "Let this wise bot make a decision for you."
        },
        {
            "name": "image",
            "value": "Give GBot something to search for, and an image will be shown!"
        },
        {
            "name": "nsfw",
            "value": "Just like image but way more lewd. Only in NSFW channels."
        },
        {
            "name": "pixiv",
            "value": "Posts a random image from pixiv! (includes sort by popularity)."
        },
        {
            "name": "pixivR",
            "value": "Posts a random nsfw image from pixiv! Only in NSFW channels."
        },
        {
            "name": "jisho",
            "value": "Search jisho.org for english -> kanji OR single kanji -> meaning."
        },
        {
            "name": "youtube",
            "value": "Search YouTube for a video; returns the first result."
        },
        {
            "name": "epic",
            "value": "Draws a random 85-90 epic for you!"
        }        
        ]
    }

    messenger.embedMessage(embed, data.channel_id);
}