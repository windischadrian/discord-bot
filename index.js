require('dotenv').config()

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const CronJob = require('cron').CronJob;
client.login(process.env.BOT_TOKEN);

client.on("ready", () => {
    console.log("Bot is ready");
    cafelutsaCronJob(client).start();
    change();
})

client.on('message', message => {
    if (message.author.bot) return;

    const messageText = message.content.toLowerCase();

    if (messageText.includes('miau')) {
        message.reply('Imi bag pula in mieunatu tau coaie');
    } else if (messageText.includes('babilon')) {
        message.reply('Baga-ti-as babilonu in cur');
    } else hei(message, messageText);

})

function hei(message, messageText) {
    if (messageText.match(/(ei|3)$/)) {
        message.reply('De pula sa ma iei hei hei');
    } else if (messageText.endsWith('5') || messageText.endsWith('cinci')) {
        message.reply('In cur ma lingi');
    } else if (messageText.match(/(arici|arici\?|arici \?)$/)) {
        message.reply('Du-te-n pula mea de aici');
    }
}

const altName = ['Mondei', 'Tvesdei', 'Vednesdei', 'Sărzdei', 'Freidei', 'Seturdei', 'Sandei'];
const date = new Date();

function change() {

    var welfareVoiceChannel =  client.channels.cache.get('698958944122699878');
    var day = date.getDay();
    var newName = 'Welfare ' + altName[day-1];

    welfareVoiceChannel.setName(newName);
}

setInterval(change, 1000000);

const cafelutsaCronJob = (client) => new CronJob('00 00 09 * * *', () => {

    var generalTextChannel = client.channels.cache.get('788439966975000576');
    generalTextChannel.send('Va urez spor la cafelutsa si sa aveti o zi minunata!');

}, null, true, 'Europe/Bucharest');