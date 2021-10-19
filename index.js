require('dotenv').config()

const { Client, Collection, Intents, Channel, MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] });
client.login(process.env.BOT_TOKEN);

// Collection of commands
const config = require('./config.json');
client.config = config;
client.commands = new Collection();
const queue = new Map();
client.queue = queue;

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
