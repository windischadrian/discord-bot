const { MessageEmbed, MessageActionRow, MessageButton, ButtonInteraction, MessageComponentInteraction } = require("discord.js");
const config = require("../config.json");

exports.run = (client, message) => {

    const interactionComponents = buttons(client, message.guild.id);

    if (!client.queue.get(message.guild.id)) return message.reply('Not playing any songs or some shit.');

    const messageEmbed = this.createQueueEmbedMessage(client, message.guild.id);

    message.channel.send({
         embeds: [messageEmbed], 
         components: [interactionComponents]
        });
    
}

exports.createQueueEmbedMessage = (client, guildId) => {
    const songsPerPage = config.songsPerPage;    
    const queue = client.queue;
    const serverQueue = queue.get(guildId);

    var messageEmbed = new MessageEmbed()
        .setTitle('**Songs in queueueueueueue:**');

    var qMessage = '';
    var totalDuration = 0;
    var i = 1;
    serverQueue.songs.some(song => {
        if(i <= songsPerPage) qMessage+= `**${i} - ${song.title} - ${song.duration}**\n`;
        totalDuration+=song.durationSeconds;
        i++;
    });

    var currentlyPlaying = serverQueue.songPlayingTitle;
    if(!currentlyPlaying) currentlyPlaying = 'No song currently playing';
    if(!qMessage) qMessage = 'No songs in queue';

    messageEmbed.addField('Currently playing', currentlyPlaying, false);
    messageEmbed.addField(`Music queueueueueueue - ${i-1} songs`, qMessage, false);

    messageEmbed.addField('Total duration: ',  
            new Date(totalDuration * 1000).toISOString().substr(11, 8));

    return messageEmbed;
}

function buttons(client, message) {
    const interactionComponents = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('previousPageButton')
                .setEmoji('◀️')
                .setStyle('SECONDARY')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('nextPageButton')
                .setEmoji('▶️')
                .setStyle('SECONDARY')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('playPauseButton')
                .setEmoji('⏯')
                .setStyle('SECONDARY')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('skipButton')
                .setEmoji('⏭')
                .setStyle('SECONDARY')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('shuffleButton')
                .setEmoji('🔀')
                .setStyle('SECONDARY')
        )

    return interactionComponents;
}

function queuePage(pageNumber) {

}

exports.previousPage = () => {

}

exports.nextPage = () => {

}