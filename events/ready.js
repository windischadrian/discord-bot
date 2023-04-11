const { CronJob } = require('cron');

module.exports = async (client) => {
    console.log("Bot is ready");
    change();

    function change() {
        const altName = ['Sandei', 'Mondei', 'Tvesdei', 'Vednesdei', 'Sărzdei', 'Freidei', 'Seturdei', ];
        const date = new Date();

        var welfareVoiceChannel =  client.channels.cache.get('698958944122699878');
        var day = date.getDay();

        try {
            var newName = 'Welfare ' + altName[day];
        
            welfareVoiceChannel.setName(newName);
            console.log(newName)

        } catch (err) {
            console.log(err)
        }
    }
    
    setInterval(change, 1000000);
    
}
