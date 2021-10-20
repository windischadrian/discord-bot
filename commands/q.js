const { MessageEmbed, MessageActionRow, MessageButton, ButtonInteraction, MessageComponentInteraction } = require("discord.js");
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

    serverQueue.songs.forEach(song => {
        qMessage+= `**${i} - ${song.title} - ${song.duration}**\n`;
        totalDuration+=song.durationSeconds;
        i++;
    });

    var currentlyPlaying = serverQueue.songPlayingTitle;
    if(!currentlyPlaying) currentlyPlaying = 'No song currently playing';
    if(!qMessage) qMessage = 'No songs in queue';

    messageEmbed.addField('Currently playing', currentlyPlaying, false);
    messageEmbed.addField('Music queueueueueueue', qMessage, false);

    var date = new Date(null);
    date.setSeconds(totalDuration);
    // qMessage+=`\n**Total queueueueueueue duration: ${date.toISOString().substr(11,8)}**`

    const interactionComponents = buttons(client,message);

    messageEmbed.addField('Total duration: ',  date.toISOString().substr(11,8), false);
    message.channel.send({
         embeds: [messageEmbed], 
         components: [interactionComponents]
        });
    
}

function buttons(client, message) {
    var button = new MessageButton();
    button.userThatCreatedButton = message.author.id;
    const interactionComponents = new MessageActionRow()
        .addComponents(
            button
                .setCustomId('PreviousPage')
                .setEmoji('◀️')
                .setStyle('SECONDARY')
        )
        .addComponents(
            button
                .setCustomId('NextPage')
                .setEmoji('▶️')
                .setStyle('SECONDARY')
        )
        .addComponents(
            button
                .setCustomId('PlayPause')
                .setEmoji('⏯')
                .setStyle('SECONDARY')
        )
        .addComponents(
            button
                .setCustomId('Skip')
                .setEmoji('⏭')
                .setStyle('SECONDARY')
        )
        .addComponents(
            button
                .setCustomId('Shuffle')
                .setEmoji('🔀')
                .setStyle('SECONDARY')
        )

    interactionComponents.userThatCreatedInteractionId = message.author.id;

    return interactionComponents;
}