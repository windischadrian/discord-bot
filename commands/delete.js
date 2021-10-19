const config = require('../config.json');

exports.run = (client, message, args) => {
    const queue = client.queue;
    const serverQueue = queue.get(message.guild.id);
    const deletePosition = args[0];
    
    if (!message.member.voice.channel) return message.reply("You need to be in a voice channel.");
    
    if (!serverQueue) return message.reply("No songs currently playing.");
    
    if (!serverQueue.songs[deletePosition-1]) return message.reply("No song on that position.");
    
    const songTitle = serverQueue.songs[deletePosition-1].title;
    serverQueue.songs.splice(deletePosition-1, 1);
    message.reply(`Removed from queue: ${songTitle}`);

}
