const playCommand = require('./play.js');

exports.run = (client, message, args) => {

    const guildId = message.guild.id;
    const serverQueue = client.queue.get(guildId);

    if (!serverQueue) return message.reply('Not playing any songs or some shit.');

    if (args.length > 1) return message.reply('Too many arguments.');

    const position = args[0];
    if (! typeof position == 'number') return message.reply('Argument not a number.');

    serverQueue.songs.unshift(serverQueue.songs.splice(position, 1)[0])
    message.react('✅')

}