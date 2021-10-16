require('dotenv').config()

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const CronJob = require('cron').CronJob;
const bahoiSuicid = 'Oricâte probleme ai avea, nu-i bine să te omori ca țăranu...te omori ieee ca pizdele alea \'mă omor miaaa\', dar tu nu mai exiști, adică tu crezi că ajungi in altă lume și pula mea cu spiritul tău..NU! Spiritul rămane...in pizda mă-tii1 Știți ce e important? Să futi, să te distrezi, să bei, mici, bere, ăăăă și toate cele, pepeni, struguri, ciorchini, toate distracțiile toate panaramele sunt atâtea carusele sunt atâtea mașinării care să apeși pe butoane sunt atâtea magarii sa canti sa vioara sa toate alea ce dracu ma te omori ce pizda mă-...psaico maico ca esti bolnav la cap că nu te placi ca pula mea ca pula-n pizdă da mai lasă-mă-n pula mea crezi ca mă omor acuma ca dacă nu mai nu stiu ce mai lasă nu știu ce...\'mă omor\' vai băga-mi-aș pula-n mă-ta te omori? Mai lasă-mă in pula mea cu omorâtu pizdii.';
client.login(process.env.BOT_TOKEN);

client.on("ready", () => {
    console.log("Bot is ready");
    console.log(bahoiSuicid);
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
    } else if (messageText.match(/(sinucid|suicid|ma omor)/)) {
        console.log(bahoiSuicid);
        message.reply(bahoiSuicid);
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