exports.run = (client, message) => {
    const queue = client.queue;
    const guildId = message.guild.id;
    const serverQueue = queue.get(guildId);

    if(!serverQueue) return message.reply("Not playing anything.");

    if(!serverQueue.songs) return;

    serverQueue.songs;
}