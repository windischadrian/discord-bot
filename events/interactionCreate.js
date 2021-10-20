const skipCommand = require('../commands/skip.js');

module.exports = async (client, interaction) => {

    console.log('interaction');
    if (!interaction.isButton()) return;

    const filter = () => {
        console.log(MessageComponentInteraction.user.id);
        console.log(ButtonInteraction.user.id);

        return MessageComponentInteraction.user.id === ButtonInteraction.user.id;
    }

    const collector = interaction.channel.createMessageComponentCollector({
        filter
    })

    collector.on('collect', async i => {
        console.log('interaction: ' + i);
        switch(i.customId) {
            case('Skip'): {
                skipCommand.skipSong(client, i.guildId);
            }
        }
    })

}