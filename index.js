require('dotenv').config()

import { Client, Intents, Channel, MessageEmbed } from 'discord.js';
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] });
client.login(process.env.BOT_TOKEN);

import { readdirSync } from "fs";

const commandFiles = readdirSync("./commands").filter(file => file.endsWith(".js"));

// Collection of commands
import config from "./config.json";
client.config = config;
client.commands = new Discord.Collection();

isready = false;

const events = readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./events/${file}`);
  client.on(eventName, event.bind(null, client));
}

const commands = readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./commands/${file}`);

  console.log(`Attempting to load command ${commandName}`);
  client.commands.set(command.name, command);
}


client.on("ready", () => {
    isReady = true;
    console.log("Bot is ready");
    cafelutsaCronJob(client).start();
    change();
})



client.on("message", async message => {
    if (!isReady) return;
    if (message.author.bot) return;

    let messageText = message.content;

    if(messageText.startsWith(`${prefix}p `)) executePCommand(message);
    if(messageText.startsWith(`${prefix}play `)) executePlayCommand(message);

    if(messageText.startsWith(`${prefix}skip`)) executeSkipCommand(message);

    if(messageText.startsWith(`${prefix}stop`)) executeStopCommand(message);

    if(messageText.startsWith(`${prefix}q`)) executeQueueueueCommand(message);
    
    if(messageText.startsWith(`${prefix}delete `) || messageText.startsWith(`${prefix}remove `)) executeDeleteCommand(message);

    messageText = messageText.toLowerCase();
    
    hei(message, messageText);

})

function voiceChannelLeave(message) {
    let connection = queue.get(message.guild.id).connection;

    if (!connection) return message.reply("Not in any voice channel.");

    connection.disconnect();
    connection.destroy();

    queue.delete(message.guild.id);
}

function executeSkipCommand(message) {
    const serverQueue = queue.get(message.guild.id);

    if (!message.member.voice.channel) return message.reply("You need to be in a voice channel.");

    if (!serverQueue) return message.reply("No songs currently playing.");

    const dispatcher = serverQueue.
    if(dispatcher) dispatcher.end()
    message.reply("Skipped current song.");
}

function executeStopCommand(message) {
    const serverQueue = queue.get(message.guild.id);

    if (!message.member.voice.channel) return message.reply("You need to be in a voice channel.");

    if (!serverQueue) return message.reply("No songs currently playing.");

    message.reply("Stopped playing songs.");
    serverQueue.connection.disconnect();
    serverQueue.connection.destroy();
    queue.delete(message.guild.id);
}
function executeDeleteCommand(message) {
    const serverQueue = queue.get(message.guild.id);
    const deletePosition = message.content.substr(`${prefix}delete `.length);

    if (!message.member.voice.channel) return message.reply("You need to be in a voice channel.");

    if (!serverQueue) return message.reply("No songs currently playing.");
    
    if (!serverQueue.songs[deletePosition-1]) return message.reply("No song on that position.");

    const songTitle = serverQueue.songs[deletePosition-1].title;
    serverQueue.songs.splice(deletePosition-1, 1);
    message.reply(`Removed from queue: ${songTitle}`);
}

function executeQueueueueCommand(message) {
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


client.on('voiceStateUpdate', async (oldState, newState) => {
    const date = new Date();
    var exclusions = ['215850233194741760'];
    console.log(newState)
    if(newState.channelId === "698958944122699878" && !exclusions.includes(newState.member.id))
    { 
        await newState.member.createDM();
        await newState.member.send(`Ia te uita, e ora ${date.toLocaleTimeString()}, ora perfecta sa sugi pula.`)
    }

    if(oldState.channelId === "698958944122699878" && !exclusions.includes(newState.member.id))
    { 
        await oldState.member.createDM();
        await oldState.member.send(`Ai plecat sa sugi pula, este?`);
    }

 });