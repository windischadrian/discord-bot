exports.run = (client, message) => {
    let queue = client.queue;
    let connection = queue.get(message.guild.id).connection;

    if (!connection) return message.reply("Not in any voice channel.");

    connection.disconnect();
    connection.destroy();

    queue.delete(message.guild.id);
    message.react(':white_check_mark:')
}