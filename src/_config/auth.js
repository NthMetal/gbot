var auth;

try {
    auth = require('./auth.json');
} catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
        throw e;
    }
    auth = {
        token: process.env.token,
        pixiv_username: process.env.pixiv_username,
        pixiv_password: process.env.pixiv_password,
        danbooru_auth: process.env.danbooru_auth
    }
}

module.exports = auth;