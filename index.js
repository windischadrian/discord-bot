require('dotenv').config()

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
process.env.TZ = 'Europe/Athens';
client.login(process.env.BOT_TOKEN);

client.on("ready", () => {
    console.log("Bot is ready");
    change();

})

client.on('message', message => {
    if (message.author.bot) return;

    const messageText = message.content.toLowerCase();

    if (messageText.includes('miau')) {
        message.reply('Imi bag pula in mieunatu tau coaie');
    } else if (messageText.includes('babilon')) {
        message.reply('Baga-ti-as babilonu in cur');
    }

})

const altName = ['Mondei', 'Tvesdei', 'Vednesdei', 'Sărzdei', 'Freidei', 'Seturdei', 'Sandei'];
const date = new Date();

function change() {
    console.log(date);

    var channel =  client.channels.cache.get('698958944122699878');
    var day = date.getDay();
    var newName = 'Welfare ' + altName[day-1];
}


setInterval(change, 1000000);
