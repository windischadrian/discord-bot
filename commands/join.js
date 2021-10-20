const { joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');
const config = require('../config.json')

exports.run = (client, message) => {
    const voiceChannel = message.member.voice.channel;
    const queue = client.queue;
    const guildId = message.guild.id;
    if (!voiceChannel) return message.reply("**You need to be in a voice channel.**");
        
    if (queue.get(guildId)) return message.reply("**Already connected to a voice channel.**");

    const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator:voiceChannel.guild.voiceAdapterCreator,
    });

    var serverQueue = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: connection,
        musicStream: createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play
            }
        }),
        songPlayingTitle: '',
        songs: [],
        volume: 5,
        playing: false,
    }

    queue.set(guildId, serverQueue);
    message.react('✅')

}