const invalidArgError = 'GBot needs 1 or 2 arguments \:o';
const invalidParseError = 'GBot doesn\'t think those are numbers';
const successfulRoll = 'GBot rolls a ';

module.exports = (args, argument, data, messenger) => {
    var value = 0;
    if(args.length < 1 || args.length > 2) {
        messenger.textMessage(invalidArgError, data.channel_id);
        return;
    }
    if(args.length === 1) {
        var upperBound = Number.parseFloat(args[0].replace(/\D/g,''));
        value = Math.floor(Math.random()*upperBound);
        console.log(value);
    }
    if(args.length === 2) {
        var upperBound = Number.parseFloat(args[1].replace(/\D/g,''));
        var lowerBound = Number.parseFloat(args[0].replace(/\D/g,''));
        value = Math.floor(Math.random()*upperBound)+lowerBound;
    }
    if(!value && value !== 0) {
        messenger.textMessage(invalidParseError, data.channel_id);
        return;
    }
    messenger.textMessage(successfulRoll+value, data.channel_id);
}