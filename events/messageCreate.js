const config = require('../config.json');

module.exports = async (client, message) => {
    // Ignore all bots
    if (message.author.bot) return;
  
    // call hei even if it's not a command
    hei(message, message.content);

    if (message.content.indexOf(client.config.prefix) !== 0) return;

    // Our standard argument/command name definition.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;
  
    // Run the command
    try {
        await cmd.run(client, message, args);
    } catch (err) {
        console.log(err);
        return message.channel.send(`Shit went sideways\n${err}`);
    } 
};

function hei(message, messageText) {
	if (messageText.match(/(sinucid|suicid|ma omor)/)) {
        message.reply(config.bahoiSuicid);
    }
}
