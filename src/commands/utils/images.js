var pixiv_username, pixiv_password, danbooru_auth;
try {
    const auth = require('../../_config/auth.json');
    pixiv_username = auth.pixiv_username;
    pixiv_password = auth.pixiv_password;
    danbooru_auth = auth.danbooru_auth;
} catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
        throw e;
    }
    pixiv_username = process.env.pixiv_username;
    pixiv_password = process.env.pixiv_password;
    danbooru_auth = process.env.danbooru_auth;
}

const rp = require('request-promise');

const PixivAppApi = require('pixiv-api-client')
const pixivImg = require('pixiv-img');
const pixiv = new PixivAppApi();

pixiv.login(pixiv_username, pixiv_password);

const Danbooru = require('danbooru');
const booru = new Danbooru(danbooru_auth);

module.exports = async (query, options, db) => {
    

    var imgOptions = Object.assign(
      {
        booru: true,
        pixiv: true,
        random: true,
        explicit: false,
        booruLimit: 10,
        pixivMaxPages: 2
      },
      options
    );
    
    var images = {
        danbooru: [],
        pixiv: []
    }
    
    if(imgOptions.booru) images.danbooru = await getBooruImages(query, imgOptions);
    
    if(imgOptions.pixiv) images.pixiv = await getPixivImages(query, imgOptions);

    return images;

}

async function getBooruImages(query, options) {
    const booruoptions = {
        limit: options.booruLimit,
        tags: query + ` rating:${options.explicit?'explicit':'safe'}`,
        random: options.random
    };
    const suggestionURL_header = 'https://';
    const suggestionURL_body = 'danbooru.donmai.us/tags/autocomplete.json?search%5Bname_matches%5D=';
    const suggestionURL_tail = '&expiry=7';
    const suggestionURL =suggestionURL_header + suggestionURL_body + encodeURIComponent(query) + suggestionURL_tail;
    
    try{
        var posts = await booru.posts(booruoptions);
    }catch(error) {
        return await rp(suggestionURL, { json: true });
    }
    return posts.length ?
    posts.map(item => ({
        imageUrl: item.large_file_url,
        source: item.source
    })) : 
    await rp(suggestionURL, { json: true });
}

async function getPixivImages(query, options) {
    var head = 'https://app-api.pixiv.net/v1/search/illust?word=';
    var body = '&search_target=partial_match_for_tags&sort=popular_desc&filter=for_ios';
    var tail = `&offset=`;
    var explicitFilter = options.explicit ? 1 : 0;
    var search = `${query} ${options.explicit?'R-18':'-R-18'}`
    var allItems = [];
    for(var i=0;i<options.pixivMaxPages;i++) {
        try {
            var items = await pixiv.requestUrl(head+encodeURIComponent(search)+body+tail+(i*30));
        }catch(error){
            // console.log(error.error.message);
            if(JSON.stringify(error).indexOf('Error occurred at the OAuth process.') !== -1) {
                pixiv.refreshAccessToken();
                i--; continue;
            }
        }
        if(items.illusts.length > 0){
            allItems.push(...items.illusts
                .filter(item => item.x_restrict == explicitFilter)
                .map(item => ({
                    imageUrl: item.image_urls.medium.replace('c/540x540_70/', ''),
                    name: item.user.name,
                    title: item.title,
                    id: item.id
                }))
            );
        }else{
            break;
        }
    }
    console.log(allItems.length);
    return allItems;
}