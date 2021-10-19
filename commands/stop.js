exports.run = (client, message) => {

    const serverQueue = queue.get(message.guild.id);

    if (!message.member.voice.channel) return message.reply("You need to be in a voice channel.");

    if (!serverQueue) return message.reply("No songs currently playing.");

    message.reply("Stopped playing songs.");
    serverQueue.connection.disconnect();
    serverQueue.connection.destroy();
    queue.delete(message.guild.id);
    
}