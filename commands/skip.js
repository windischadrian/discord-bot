const playCommand = require('./play.js');

exports.run = async (client, message) => {
    const queue = client.queue;
    const guildId = message.guild.id;
    const serverQueue = queue.get(guildId);

    if (!message.member.voice.channel) return message.reply("**You need to be in a voice channel.**");

    if (!serverQueue) return message.reply("**No songs currently playing.**");

    await this.skipSong(client, guildId);

    message.react('✅')
}

exports.skipSong = async (client, guildId) => {
    await playCommand.playSong(client, guildId);
}