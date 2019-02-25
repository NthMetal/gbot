var search = require('youtube-search')

var opts = {
    maxResults: 5,
    key: 'AIzaSyBVs6ga7IuDBcbTyhkYM1dK7Y3kgaLWlPA'
};

module.exports = async (args, argument, data, messenger, db) => {

    search(argument, opts, function(err, results) {
        if(err) return console.log(err);
        console.dir(results);
        messenger.textMessage(results[0].link, data.channel_id);
    });

}