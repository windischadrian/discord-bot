exports.run = (client, message) => {
    const queue = client.queue;
    const guildId = message.guild.id;
    const serverQueue = queue.get(guildId);

    if(!serverQueue) return message.reply("Not playing anything.");

    if(!serverQueue.songs) return;

    songs = serverQueue.songs;
    serverQueue.songs = shuffle(songs);
    message.react('\:white_check_mark\:')
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }