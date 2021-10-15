require('dotenv').config()

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.login(process.env.BOT_TOKEN)

client.on("ready", () => {
    console.log("Bot is ready");
    change();

})

client.on('message', message => {
    if (message.author.bot) return;

    if (message.content.includes('miau')) {
        message.reply('Imi bag pula in mieunatu tau coaie');
    } else if (message.content.includes('babilon')) {
        message.reply('Baga-ti-as babilonu in cur');
    }

    await client.process
})

const altName = ['Mondei', 'Tvesdei', 'Vednesdei', 'Sărzdei', 'Freidei', 'Seturdei', 'Sandei'];
const date = new Date();

function change() {
    var channel =  client.channels.cache.get('698958944122699878');
    var day = date.getDay();
    var newName = 'Welfare ' + altName[day-1];

    channel.setName(newName);
}


setInterval(change, 1000000);
