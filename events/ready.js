const { CronJob } = require('cron');

module.exports = async (client) => {
    console.log("Bot is ready");
    cafelutsaCronJob(client).start();
    change();

    function change() {
        const altName = ['Sandei', 'Mondei', 'Tvesdei', 'Vednesdei', 'Sărzdei', 'Freidei', 'Seturdei', ];
        const date = new Date();

        var welfareVoiceChannel =  client.channels.cache.get('698958944122699878');
        var day = date.getDay();

        try {
            var newName = 'Welfare ' + altName[day];
        
            welfareVoiceChannel.setName(newName);

        } catch (err) {
            console.log(err)
        }
    }
    
    setInterval(change, 1000000);
    
}


const cafelutsaCronJob = (client) => new CronJob('00 00 09 * * *', () => {
    var generalTextChannel = client.channels.cache.get('788439966975000576');

    try {
        generalTextChannel.send('Va urez spor la cafelutsa si sa aveti o zi minunata!');
    } catch (err) {
        console.log(err)
    }

}, null, true, 'Europe/Bucharest');