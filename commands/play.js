const playdl = require('play-dl');

const { getVoiceConnection, joinVoiceChannel, createAudioResource, createAudioPlayer, AudioPlayerStatus } = require('@discordjs/voice');

exports.run = async (client, message) => {

    let voiceChannel = message.member.voice.channel;
    const messageChannel = message.channel;
    if (!voiceChannel) return message.reply("You need to be in a voice channel.");

    if (!audioName) return message.reply("Forgot song title?");

    var serverQueue = queue.get(message.guild.id);
    if (!serverQueue) {
        voiceChannelJoin(message, voiceChannel);
        serverQueue = queue.get(message.guild.id)
    }

    try {
        var songInfo;
        const audioType = playdl.yt_validate(audioName);

        switch(audioType) {
            case 'video': {
                message.suppressEmbeds(true);
                audioName=audioName.trim();
                songInfo = await searchYoutubeByUrlAsync(audioName);
            } break;
            case 'search': {
                songInfo = await searchYoutubeAsync(audioName);
            } break;
            case 'playlist': {
                return message.reply('Playlist integration in progress bro chill tf down.');
            }
        }

        const song = {
            title: songInfo.title,
            url: songInfo.url,
            duration: songInfo.durationRaw,
            durationSeconds: songInfo.durationInSec
        }
        
        serverQueue.songs.push(song);

        if (!serverQueue.playing) play(message);

        messageChannel.send(`Added **${song.title}** to the queue.\n${song.url}`);
    } catch (err) {
        console.log(err);
        return messageChannel.send(`Shit went sideways\n${err}`);
    }
    
}

// Search Youtube by search params    
async function searchYoutubeAsync(songName) {
    const videoResult = await playdl.search(songName);
    const songInfo = videoResult[0];
    return songInfo;
}

// Search Youtube by video url
async function searchYoutubeByUrlAsync(songUrl) {
    const songInfo = await playdl.video_basic_info(songUrl);
    return songInfo.video_details;
}

// play song
async function play(message) {
    const messageChannel = message.channel;
    const guildId = message.guild.id;
    const serverQueue = queue.get(guildId);
    const song = serverQueue.songs[0];

    if (!song) {
        connection = serverQueue.connection;
        connection.disconnect();
        connection.destroy();
        queue.delete(guildId);
        return;
    }

    try {
        const stream = await playdl.stream(song.url, {
            quality : 1
        });
        let resource = createAudioResource(stream.stream, {
            inputType: stream.type
        })

        serverQueue.musicStream.play(resource);

        serverQueue.connection.subscribe(serverQueue.musicStream);
        serverQueue.playing = true;

        serverQueue.textChannel.send(`Playing: **${song.title}**`);

        serverQueue.musicStream.on(AudioPlayerStatus.Idle, () => {
            serverQueue.playing = false;
            serverQueue.songs.shift();
            play(message)
        });

    } catch (err) {
        console.log(err);
        return messageChannel.send(`Shit went sideways\n${err}`);
    }
    
}