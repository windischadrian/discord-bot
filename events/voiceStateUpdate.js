module.exports = async (client, oldState, newState) => {
    const date = new Date();
    const allowedUsers = ['356698378652090380', '95590636408803328', '406955988546224128', '237939756959268865', '215499279756820480']
    if(newState.channelId === "698958944122699878" && allowedUsers.includes(newState.member.id))
    { 
        await newState.member.createDM();
        await newState.member.send(`Ia te uita, e ora ${date.toLocaleTimeString()}, ora perfecta sa sugi pula.`)
    }

    if(oldState.channelId === "698958944122699878" && allowedUsers.includes(newState.member.id))
    { 
        await oldState.member.createDM();
        await oldState.member.send(`Ai plecat sa sugi pula, este?`);
    }

};