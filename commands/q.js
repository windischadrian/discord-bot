const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

exports.run = (client, message) => {
    const queue = client.queue;
    const songsPerPage = config.songsPerPage;
    const serverQueue = queue.get(message.guild.id);

    if (!serverQueue) return message.reply('Not playing any songs or some shit.');

    var qMessage = '';
    var totalDuration = 0;
    var i = 1;

    var messageEmbed = new MessageEmbed()
        .setTitle('**Songs in queueueueueueue:**');
    var currentlyPlaying = serverQueue.songPlayingTitle;
    if(!currentlyPlaying) currentlyPlaying = 'No song currently playing';
    messageEmbed.addField('Currently playing', currentlyPlaying, false);
    console.log(currentlyPlaying);

    serverQueue.songs.forEach(song => {
        qMessage+= `**${i} - ${song.title} - ${song.duration}**\n`;
        totalDuration+=song.durationSeconds;
        i++;
    });
    console.log(qMessage);

    messageEmbed.addField('Music queueueueueueue', qMessage, false);
    var date = new Date(null);
    date.setSeconds(totalDuration);
    // qMessage+=`\n**Total queueueueueueue duration: ${date.toISOString().substr(11,8)}**`
    console.log(date);
    
    messageEmbed.addField('Total duration: ',  date.toISOString().substr(11,8), false);
    message.channel.send(messageEmbed);
    
}