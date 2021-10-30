const { MessageEmbed, MessageActionRow, MessageButton, ButtonInteraction, MessageComponentInteraction } = require("discord.js");
const shuffleCommand = require('../commands/shuffle.js');
const qCommand = require('../commands/q.js');

exports.run = async (client, interaction) => {
    await shuffleCommand.shuffleSongs(client, interaction.guildId);
    const messageEmbed = qCommand.createQueueEmbedMessage(client, interaction.guildId);
    interaction.update({
        embeds: [messageEmbed]
      })
}
