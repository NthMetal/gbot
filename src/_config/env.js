var dev = require('./env_development');
var prod = require('./env_production');

function getEnvironment(env) {
    switch(env) {
        case 'development':
            return dev;
        case 'production':
            return prod;
        default:
            return prod;
    }
}

module.exports.env = getEnvironment;