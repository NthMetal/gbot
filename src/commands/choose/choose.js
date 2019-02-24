

module.exports = async (args, argument, data, messenger, db) => {
    var outcome =  args[Math.floor(Math.random()*args.length)];
    messenger.textMessage('My wisdom, unto you: '+outcome, data.channel_id);
}