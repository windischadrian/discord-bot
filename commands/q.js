exports.run = (client, message) => {
    try {
        const serverQueue = queue.get(message.guild.id);

        if (!serverQueue) return message.reply('Not playing any songs or some shit.');
    
        var qMessage = '**Songs in queueueueueueue:**\n';
        var totalDuration = 0;
        var i = 1;
        serverQueue.songs.forEach(song => {
            qMessage+= `**${i} - ${song.title} - ${song.duration}**\n`;
            totalDuration+=song.durationSeconds;
            i++;
        });
        var date = new Date(null);
        date.setSeconds(totalDuration);
        qMessage+=`\n**Total queueueueueueue duration: ${date.toISOString().substr(11,8)}**`
        message.channel.send(qMessage);
    } catch (err) {
        return message.reply(`Shit went sideways\n${err}`);
    }
    
}