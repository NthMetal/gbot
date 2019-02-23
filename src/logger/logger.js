var fs = require('fs');
var path = require('path');
var winston = require('winston');
var {env} = require(`../_config/env.js`);

const logfile = path.join(__dirname, `../_logs/${env.logging.logger_file}`);

/**
 * Archive previous log file if it exists.
 */
if(fs.existsSync(logfile) && env.logging.archive_file) {
    var filedate = (new Date()).toJSON().replace(':','-').replace(':','-');
    const newfile = logfile.split('.').join(`${filedate}.`);
    fs.rename(logfile, newfile, function (err) {
      if (err) throw err
    });
}

const logger = winston.createLogger({
  level: env.logging.logger_level,
  format: winston.format.json(),
  transports: [
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: logfile })
  ]
});

/**
 * If we're not in production then log to the 'console' with the format:
 * '${info.level}: ${info.message} JSON.stringify({ ...rest }) '
 */
if (env.logging.console_logging) {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
}

logger.info = (message, callback) => {
  return logger.log('info', `${new Date()}----------- ${message}`, callback);
}

logger.debug = (message, callback) => {
  return logger.info('debug', `${new Date()}----------- ${message}`, callback);
}


module.exports.logger = logger;