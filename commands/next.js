const playCommand = require('./play.js');

exports.run = (client, message, args) => {
    console.log('args: ' + args);
    console.log('isArray: ' + message);
    console.log('message: ' + Array.isArray(args));

    const guildId = message.guild.id;
    const serverQueue = client.queue.get(guildId);

    if (!serverQueue) return message.reply('Not playing any songs or some shit.');

    if (Array.isArray(args)) return message.reply('Too many arguments.');

    const position = args;
    if (! typeof position == 'number') return message.reply('Argument not a number.');

    serverQueue.songs.unshift(serverQueue.songs.splice(pos, 1)[0])
    message.react('✅')

}