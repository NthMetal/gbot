

module.exports = async (args, argument, data, messenger, db) => {
    let eightballPredictions = (await db.collection('basic').findOne({ name: 'eight ball' })).predictions;
    var outcome = eightballPredictions[Math.floor(Math.random()*eightballPredictions.length)];
    messenger.textMessage(':8ball: '+outcome, data.channel_id);
}