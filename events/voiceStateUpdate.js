const { getVoiceConnection } = require('@discordjs/voice');

module.exports = async (client, oldState, newState) => {

    // if nobody left the channel in question, return.
    if (oldState.channelId !==  oldState.guild.me.voice.channelId || newState.channel) return;

    // otherwise, check how many people are in the channel now
    if (!oldState.channel.members.size - 1) 
    setTimeout(() => { // if 1 (you), wait five minutes
        if (! (oldState.channel.members.size - 1) ) // if there's still 1 member, 
            {
                getVoiceConnection(oldState.guild.id).disconnect(); //leave
                console.log('Inactive voice channel, leaving.');
            }
    }, 100000); // (5 min in ms)

};