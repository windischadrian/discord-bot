const playdl = require('play-dl');
const joinCommand = require('./join.js');
const config = require('../config.json');

const { createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
exports.run = async (client, message, args) => {

    const guildId = message.guild.id;
    const queue = client.queue;
    const voiceChannel = message.member.voice.channel;
    const messageChannel = message.channel;
    var audioName = args.join(' ');
    var serverQueue = queue.get(guildId);

    if (!voiceChannel) return message.reply("You need to be in a voice channel.");

    if (!audioName) return message.reply("Forgot song title?");

    if (!serverQueue) {
        joinCommand.run(client, message);
        serverQueue = queue.get(guildId)
    }

    var songInfo;
    const validationResult = await playdl.validate(audioName);
    title = '';
    url = '';

    switch(validationResult) {

        case 'yt_video' : {
            message.suppressEmbeds(true);
            audioName=audioName.trim();
            songInfo = await searchYoutubeByUrlAsync(audioName);
            title = songInfo.title;
            url = songInfo.url;
            pushSong(songInfo, serverQueue);
        } break;
        case 'search': {
            songInfo = await searchYoutubeAsync(audioName);
            title = songInfo.title;
            url = songInfo.url;
            pushSong(songInfo, serverQueue);
        } break;
        case 'yt_playlist': {
            try {
                functionResult =  await searchYoutubeByPlaylist(audioName);
                multipleSongInfo = functionResult.multipleSongInfo;
                title = functionResult.title;
                pushSongsFromPlaylist(multipleSongInfo, serverQueue);
            } catch (err) {
                console.log(err)
                return message.reply('Playlist has unavailable tracks. Cannot play');
            }
        }
    }

    if (!serverQueue.playing) this.playSong(client, message);
    messageChannel.send(`Added **${title}** to the queue.\n${url}`);

    
}

function pushSong(songInfo, serverQueue) {
    const song = {
        title: songInfo.title,
        url: songInfo.url,
        duration: songInfo.durationRaw,
        durationSeconds: songInfo.durationInSec
    }

    serverQueue.songs.push(song);

}

function pushSongsFromPlaylist(multipleSongInfo, serverQueue) {
    if (multipleSongInfo.length > config.songsPerPage) {
        slicedMultipleInfo = multipleSongInfo.slice(0, config.songsPerPage);
    }

    for (i in slicedMultipleInfo) {
        songInfo = slicedMultipleInfo[i];
        song = {
            title: songInfo.title,
            url: songInfo.url,
            duration: songInfo.durationRaw,
            durationSeconds: songInfo.durationInSec
        }

        serverQueue.songs.push(song);
    }
}

// Search Youtube by search params    
async function searchYoutubeAsync(songName) {
    const videoResult = await playdl.search(songName, {limit: 1});
    const songInfo = videoResult[0];
    return songInfo;
}

// Search Youtube by video url
async function searchYoutubeByUrlAsync(songUrl) {
    const songInfo = await playdl.video_basic_info(songUrl);
    return songInfo.video_details;
}

// Search Youtube by playlist url
async function searchYoutubeByPlaylist(playlistUrl) {
    try {
        response = await playdl.playlist_info(playlistUrl);
        title = response.title;
        multipleSongInfo = response.videos;
        return { multipleSongInfo, title};
    } catch (err) {
        throw err;
    }
}

// play song
exports.playSong = async (client, message) => {
    const queue = client.queue;
    const guildId = message.guild.id;
    const serverQueue = queue.get(guildId);

    if (!serverQueue) return;

    const song = serverQueue.songs[0];

    if (!song) {
        connection = serverQueue.connection;
        connection.disconnect();
        connection.destroy();
        queue.delete(guildId);
        return;
    }

    const stream = await playdl.stream(song.url);
    let resource = createAudioResource(stream.stream, {
        inputType: stream.type
    })

    serverQueue.musicStream.play(resource);
    serverQueue.connection.subscribe(serverQueue.musicStream);
    serverQueue.playing = true;
    serverQueue.songPlayingTitle = song.title
    serverQueue.songs.shift();

    serverQueue.textChannel.send(`Playing: **${song.title}**`);

    serverQueue.musicStream.on(AudioPlayerStatus.Idle, () => {
        serverQueue.playing = false;
        serverQueue.songs.shift();
        this.playSong(client, message)
    });

    
}