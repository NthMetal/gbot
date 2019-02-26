const images = require('../utils/images.js');
const pixivImg = require('pixiv-img');

const invalidArgError = 'GBot needs to know what you wanna search for \:o';
const notfound = 'GBot couldn\'t find anything \:(';

const jishoApi = require('unofficial-jisho-api');
const jisho = new jishoApi();


module.exports = async (args, argument, data, messenger, db) => {
    if(!argument) {
        messenger.errorMessage(invalidArgError, data.channel_id);
        return;
    }

    if (argument.match(/[a-zA-Z]/i)) {
        jisho.searchForPhrase(argument).then(async result => {
            messenger.textMessage('searching for: '+result.data[0].slug, data.channel_id);
            var command = data.content.split(result.data[0].slug)[0].substr(-2) === 'R ' ? 'pixivR' : 'pixiv';
            const options = {
                booru: false,
                explicit: command === 'pixivR',
                pixivMaxPages: 5
            }
            var imageList = await images(argument, options, db);
            if(imageList.pixiv.length>0 && imageList.pixiv[0].imageUrl){
                var randindex = Math.floor(Math.random()*imageList.pixiv.length);
                const rand = imageList.pixiv[randindex];
                const message = `${rand.title} by: ${rand.name} ${randindex}/${imageList.pixiv.length}\n<https://www.pixiv.net/member_illust.php?mode=medium&illust_id=${rand.id}>`;
                await pixivImg(rand.imageUrl, 'src/assets/pixivimage.jpg');
                messenger.imgUpload('src/assets/pixivimage.jpg', data.channel_id, message, options.explicit);
            }else {
                messenger.errorMessage(notfound, data.channel_id);
            }
        })
    }else{
        var command = data.content.split(argument)[0].substr(-2) === 'R ' ? 'pixivR' : 'pixiv';
        const options = {
            booru: false,
            explicit: command === 'pixivR',
            pixivMaxPages: 5
        }
        var imageList = await images(argument, options, db);
        if(imageList.pixiv.length>0 && imageList.pixiv[0].imageUrl){
            var randindex = Math.floor(Math.random()*imageList.pixiv.length);
            const rand = imageList.pixiv[randindex];
            const message = `${rand.title} by: ${rand.name} ${randindex}/${imageList.pixiv.length}\n<https://www.pixiv.net/member_illust.php?mode=medium&illust_id=${rand.id}>`;
            await pixivImg(rand.imageUrl, 'src/assets/pixivimage.jpg');
            messenger.imgUpload('src/assets/pixivimage.jpg', data.channel_id, message, options.explicit);
        }else {
            messenger.errorMessage(notfound, data.channel_id);
        }
    }
    
}