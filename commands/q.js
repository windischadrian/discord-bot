const { MessageEmbed } = require("discord.js");
const { songsPerpage } = require("../config.json");

exports.run = (client, message) => {
    const queue = client.queue;
    const serverQueue = queue.get(message.guild.id);

    if (!serverQueue) return message.reply('Not playing any songs or some shit.');

    var qMessage = '**Songs in queueueueueueue:**\n';
    var totalDuration = 0;
    var i = 1;

    const messageEmbed = new MessageEmbed()
        .setTitle('**Songs in queueueueueueue:**')

    serverQueue.songs.forEach(song => {
        qMessage+= `**${i} - ${song.title} - ${song.duration}**\n`;
        totalDuration+=song.durationSeconds;
        i++;
    });

    console.log('songs per page: ' + songsPerpage);
    console.log('song playing: ' + serverQueue.songPlayingTitle);
    var date = new Date(null);
    date.setSeconds(totalDuration);
    qMessage+=`\n**Total queueueueueueue duration: ${date.toISOString().substr(11,8)}**`
    message.channel.send(qMessage);
    
}