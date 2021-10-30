const { MessageEmbed, MessageActionRow, MessageButton, ButtonInteraction, MessageComponentInteraction } = require("discord.js");
const skipCommand = require('../commands/skip.js');
const qCommand = require('../commands/q.js');

exports.run = async (client, interaction) => {
    await skipCommand.skipSong(client, interaction.guildId);
    const messageEmbed = qCommand.createQueueEmbedMessage(client, interaction.guildId);
    interaction.update({
        embeds: [messageEmbed]
      })
}
