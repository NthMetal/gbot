module.exports = (message, prefix) => {
    var data = message.replace(prefix, '').split(' ');

    var parsedData = {
        command: data.shift(),
        args: data,
        argument: data.join(' ')
    }

    return parsedData;
}