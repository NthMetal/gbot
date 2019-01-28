const GoogleImages = require('google-images');
const { google_image_key_1 } = require('../../../_config/auth.json')

/**
 * imgur, 
 * pixiv, 
 * tumbler,
 * deviantart, 
 * boorus, 
 * google, 
 * konachan,
 * gyphy,
 */
const standardSearch = '000610226186474111148:tkdkoij6jpk';

const client = new GoogleImages(standardSearch, google_image_key_1);

const invalidArgError = 'GBot needs to know what you wanna search for \:o';
const notFoundError = 'GBot couldn\'t find anything \:(';

module.exports = (args, argument, data, messenger) => {
    if(!argument) {
        messenger.textMessage(invalidArgError, data.channel_id);
        return;
    }
    var pagenum = Math.floor(Math.random()*25) + 1;
    var options = {
        page: pagenum
    }
    client.search(argument, options)
    .then(images => {
        if(!images.length) {
            messenger.textMessage(notFoundError, data.channel_id);
        }else{
            console.log(images.length);
            var imagei = Math.floor(Math.random()*images.length);
            console.log(imagei);
            messenger.imgMessage(images[imagei].url, data.channel_id);
        }
    });
}