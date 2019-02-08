const images = require('../utils/images.js');

const invalidArgError = 'GBot needs to know what you wanna search for \:o';
const notfoundSuggestions = 'GBot couldn\'t find anything, try these suggestions:';

module.exports = async (args, argument, data, messenger) => {
    if(!argument) {
        messenger.errorMessage(invalidArgError, data.channel_id);
        return;
    }
    const options = {
        pixiv: false,
        google: false,
        explicit: true
    }
    var imageList = await images(argument, options);
    if(imageList.danbooru.length>0 && imageList.danbooru[0].imageUrl){
        const rand = imageList.danbooru[Math.floor(Math.random()*imageList.danbooru.length)].imageUrl;
        messenger.imgMessage(rand, data.channel_id);
    }else
    if(imageList.danbooru.length>0){
        var reactions = ['one','two','three','four','five'];
        var errorOpts = [];
        var i;
        for(i=0;i<5;i++){
            if(imageList.danbooru[i]){
                errorOpts.push({ 
                    reaction: reactions[i], 
                    msg: `${i+1}. ${imageList.danbooru[i].name}`,
                    data: imageList.danbooru[i].name
                })
            }else{
                break;
            }
        }
        errorOpts.push({ 
            reaction: 'x', 
            msg: `${i+1}. Cancel`,
            data: 'x'
        })
        messenger.errorOptions('nsfw', argument, errorOpts, notfoundSuggestions, data);
    }
}