const skipCommand = require('../commands/skip.js');

module.exports = async (client, interaction) => {

    if (!interaction.isButton()) return;

    const filter = () => {
        return MessageComponentInteraction.user.id === ButtonInteraction.user.id;
    }

    const collector = interaction.channel.createMessageComponentCollector({
        filter
    })

    collector.on('collect', async i => {
        switch(i.customId) {
            case('Skip'): {
                skipCommand.skipSong(client, i.guildId);
            }
        }
    })

}