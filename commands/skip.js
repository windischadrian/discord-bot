exports.run = (client, message) => {
    const serverQueue = queue.get(message.guild.id);

    if (!message.member.voice.channel) return message.reply("You need to be in a voice channel.");

    if (!serverQueue) return message.reply("No songs currently playing.");

    // const dispatcher = serverQueue.
    // if(dispatcher) dispatcher.end()
    message.reply("Skipped current song.");
}