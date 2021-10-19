const { CronJob } = require('cron');

module.exports = (client, message) => {
    isReady = true;
    console.log("Bot is ready");
    cafelutsaCronJob(client).start();
    change(client);
}


const altName = ['Sandei', 'Mondei', 'Tvesdei', 'Vednesdei', 'Sărzdei', 'Freidei', 'Seturdei', ];
const date = new Date();

function change(client) {

    var welfareVoiceChannel =  client.channels.cache.get('698958944122699878');
    var day = date.getDay();
    var newName = 'Welfare ' + altName[day];

    welfareVoiceChannel.setName(newName);
}

setInterval(change, 1000000);


const cafelutsaCronJob = (client) => new CronJob('00 00 09 * * *', () => {

    var generalTextChannel = client.channels.cache.get('788439966975000576');
    generalTextChannel.send('Va urez spor la cafelutsa si sa aveti o zi minunata!');

}, null, true, 'Europe/Bucharest');