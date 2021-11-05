const joinCommand = require('./play.js');

exports.run = (client, message, args) => {
    const guildId = message.guild.id;
    const queue = client.queue;
    const voiceChannel = message.member.voice.channel;
    const messageChannel = message.channel;

    const playlistUrl = 'https://www.youtube.com/playlist?list=PLZbtvStE3g4tu6Im9sCaRBwwHwIsUHNn5';

    var serverQueue = queue.get(guildId);
    if (serverQueue) message.reply('Already playing something, will not add playlist to queue.');

    try {
        joinCommand.run(client, message, playlistUrl);
    } catch (err) {
        console.log(err);
    }

}