const { joinVoiceChannel } = require('@discordjs/voice');

exports.run = (client, message) => {
    let voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply("You need to be in a voice channel.");
        
    if (queue.get(message.guild.id)) return message.reply("Already connected to a voice channel.");

    const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator:voiceChannel.guild.voiceAdapterCreator,
    });

    message.channel.send(`Joined ${voiceChannel.name} channel. Use **${prefix}play** to add songs to the queue.`)

}