const { MessageEmbed, MessageActionRow, MessageButton, ButtonInteraction, MessageComponentInteraction } = require("discord.js");
const skipCommand = require('../commands/skip.js');
const qCommand = require('../commands/q.js');

module.exports = async (client, interaction) => {

    if (!interaction.isButton()) return;

    const button =  client.buttons.get(interaction.customId);
    if(!button) return await interaction.reply({ 
        content:  'No button code for this button.',
        ephemeral: true,
    })

    try {
        button.run(client, interaction);
    } catch (err) {
        console.error(err);
        await interaction.reply({
            content: 'Shit went sideways',
            ephemeral: true
        })
    }

}